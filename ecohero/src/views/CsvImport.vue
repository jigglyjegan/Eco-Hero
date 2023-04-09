<template>
  <input type="file" id="inputFile" accept="csv" onClick="uploadFile()" />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    async uploadFile() {
      const storage = getStorage();
      var file = document.getElementById("inputFile");
      var uid = this.user.uid;
      var today = new Date();
      var timeStamp = today.now();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      var todayString = dd + "/" + mm + "/" + yyyy;

      var filePath = ref(storage, file.name);

      try {
        const docRef = await setDoc(doc(db, "dataUploads", uid), todayString, { //update metadata into firestore
            path : filePath,
            timestamp: timeStamp,
          });
        console.log(docRef);
        document.getElementById("inputFile").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error: ", error);
      }

      uploadBytes(filePath, file) // upload file to file storage 

      if (file) { // convert csv to json 
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result
          const lines = result.split('\n') 
          const header = lines[0].split(',') 
          const output = lines.slice(1).map(line => {
          const fields = line.split(',') 
          return Object.fromEntries(header.map((h, i) => [h, fields[i]])) 
            })

            console.log(output)
           // var json = JSON.parse(output) //parsing but not sure how to get the {{json}} out 
          }
      }

     
      /*var dateInput = json["DATE"]
      var departmentInput = json["DEPARTMENT"]
      var carbonInput =json["CARBON"]
      var electricityInput =json["ELECTRICITY"]
      var waterInput =json["WATER"]*/



    },
  },
};
</script>

<style></style>
