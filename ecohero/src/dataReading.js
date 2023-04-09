// This script contains functions for reading the csv data file that the user uploads
// We have abstracted the functions out as the script is relatively long, due to the
// database rules we have in place.
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

async function updateFs(file, uid) {
  var reader = new FileReader(); // Init file reader
  reader.onload = async function () {
    // Define onload method
    var content = reader.result;
    //split csv file using "\n" for new line (each row)
    var lines = await content.split("\n");

    // Init 3 variables that we need to update our mthly and yrly tables
    var years = [];
    var mths = [];
    var depts = [];

    for (var i = 1; i < lines.length - 1; i++) {
      // Parse variables
      var row = lines[i].split(",");
      var dept = row[0];
      var date = row[1].split("/");
      var day =  date[0];
      var month = date[1];
      var year = date[2];

      if (day.length < 2) {
        day = "0" + day;
      }
      if (month.length < 2) {
        month = "0" + month;
      }
      var carbon = parseFloat(row[2]);
      var elec = parseFloat(row[3]);
      var water = parseFloat(row[4]);
      var key = uid + dept + year + month;

      // Populate Firebase
      // 1) Store information needed for updateMthYr fn
      if (!years.includes(year)) {
        years.push(year)
      }
      if (!mths.includes(month)) {
        mths.push(month)
      }
      if (!depts.includes(dept)) {
        depts.push(dept)
      }

      // 2) We populate using the following logic
      // Check if record exists. Update if exists, else add as new and merge
      var exists = await getDoc(doc(db, "depts", uid));
      if (exists.exists()) {
        updateDoc(doc(db, "depts", uid), {
          [dept]: true,
        });
      } else {
          setDoc(doc(db, "depts", uid), {
          // Store depts for chart function's use
            [dept]: true,
          }, { merge: true }
          );
        }

      exists = await getDoc(doc(db, "carbonUsageDaily", key));
      if (exists.exists()) {
        updateDoc(doc(db, "carbonUsageDaily", key), {
          [day]: carbon,
        });
      } else {
          setDoc(doc(db, "carbonUsageDaily", key), {
            [day]: carbon,
          }, { merge: true });
        }
      
      exists = await getDoc(doc(db, "elecUsageDaily", key));
      if (exists.exists()) {
        updateDoc(doc(db, "elecUsageDaily", key), {
          [day]: elec,
        });
      } else {
          setDoc(doc(db, "elecUsageDaily", key), {
            [day]: elec,
          }, { merge : true });
        }

      exists = await getDoc(doc(db, "waterUsageDaily", key));
      if (exists.exists()) {
        updateDoc(doc(db, "waterUsageDaily", key), {
          [day]: water,
        });
      } else {
          setDoc(doc(db, "waterUsageDaily", key), {
            [day]: water,
          }, { merge: true });
        }
    }
    // Update mthly and yearly collections in Firebase
    // console.log(years)
    // console.log(mths)
    // console.log(depts)
    updateMthYr(uid, years, mths, depts)
    console.log("Updated FS");
  };
  reader.readAsText(file);
}

async function updateMthYr(uid, years, mths, depts) {
  // console.log(depts)
  // console.log(years)
  // console.log(mths)
  for (var dept of depts) {
    var dkey = uid + dept
    for (var year of years) {
      // console.log('y', year)
      var ykey = dkey + year
      var cYr = 0;
      var eYr = 0;
      var wYr = 0;
      for (var mth of mths) {
        var mkey = ykey + mth
        // Get the data
        // console.log('mkey: ', mkey)
        var cData = await getDoc(doc(db, 'carbonUsageDaily', mkey));
        var eData = await getDoc(doc(db, 'elecUsageDaily', mkey));
        var wData = await getDoc(doc(db, 'waterUsageDaily', mkey));

        // Aggregate
        var cMth = 0
        var eMth = 0
        var wMth = 0
        for (var ckey in cData.data()){
          // console.log('k: ', ckey)
          // console.log('v: ', cData.data()[ckey])
          cMth += cData.data()[ckey]
        }
        for (var ekey in eData.data()){
          eMth += eData.data()[ekey]
        }
        for (var wkey in wData.data()){
          wMth += wData.data()[wkey]
        }

        // Store mthly usage
        var exists = await getDoc(doc(db, "carbonUsageMthly", ykey));
        if (exists.exists()) {
          updateDoc(doc(db, "carbonUsageMthly", ykey), {
            [mth]: cMth,
          });
        } else {
            setDoc(doc(db, "carbonUsageMthly", ykey), {
              [mth]: cMth,
            }, { merge: true });
          }
        
        exists = await getDoc(doc(db, "elecUsageMthly", ykey));
        if (exists.exists()) {
          updateDoc(doc(db, "elecUsageMthly", ykey), {
            [mth]: eMth,
          });
        } else {
            setDoc(doc(db, "elecUsageMthly", ykey), {
              [mth]: eMth,
            }, { merge: true });
          }
          
        exists = await getDoc(doc(db, "waterUsageMthly", ykey));
        if (exists.exists()) {
          updateDoc(doc(db, "waterUsageMthly", ykey), {
            [mth]: wMth,
          });
        } else {
            setDoc(doc(db, "waterUsageMthly", ykey), {
              [mth]: wMth,
            }, { merge: true });
          }    
      
        // Update yrly total
        cYr += cMth
        eYr += eMth
        wYr += wMth
      }

      // Now we update the yearly values
      exists = await getDoc(doc(db, "carbonUsageYrly", dkey));
      if (exists.exists()) {
        updateDoc(doc(db, "carbonUsageYrly", dkey), {
          [year]: cYr,
        });
      } else {
          setDoc(doc(db, "carbonUsageYrly", dkey), {
            [year]: cYr,
          }, { merge: true });
        }
      
      exists = await getDoc(doc(db, "elecUsageYrly", dkey));
      if (exists.exists()) {
        updateDoc(doc(db, "elecUsageYrly", dkey), {
          [year]: eYr,
        });
      } else {
          setDoc(doc(db, "elecUsageYrly", dkey), {
            [year]: eYr,
          }, { merge: true });
        }
        
      exists = await getDoc(doc(db, "waterUsageYrly", dkey));
      if (exists.exists()) {
        updateDoc(doc(db, "waterUsageYrly", dkey), {
          [year]: wYr,
        });
      } else {
          setDoc(doc(db, "waterUsageYrly", dkey), {
            [year]: wYr,
          }, { merge: true });
        }
    }
  }
  console.log('Update mthly and yrly tables complete')
}

export { updateFs, updateMthYr}
