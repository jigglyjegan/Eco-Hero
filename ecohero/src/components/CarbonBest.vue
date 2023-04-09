<template>
  <div v-if= "user">
      <h2> OVERALL CARBON EMISSIONS </h2>
      <div class="card">
              <fa icon = "smog" />
      </div>
    <column-chart :data="this.dataSet" xtitle="Department"  ytitle="Carbon Emissions (metric tons) "></column-chart>
    
  </div>
</template>



<script>
import firebaseApp from "@/firebase.js";
//import { onMounted, reactive } from "@vue/runtime-core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'chartkick/chart.js';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
var usage = {};

export default {
  data() {
    
    
    return {
      user: false,
      selected : '',
      selected1: '',
      selected2: '',
      dataSet: {},
      dataList: []
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.graphData(this.user);
      }
    });
  },

  //idea is to have a go button to refresh the page which are going to have new values
  methods: {
    

    async graphData(user) {
        var dummyDataSet = {};
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        var uid = user.uid
        //console.log("PIE: " + uid)
        const collectionName = "carbonUsageYrly";
      //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid
      
        //console.log("PIE: " + collectionName)
      //include dropdown option for collection
        var departments2 = await getDoc(doc(db, "depts", uid));
        var departmentsData2 = departments2.data();
        for (const [dept, bool] of Object.entries(departmentsData2)) {
            console.log(bool)
            const dataRef2 = uid + dept
            //console.log("PIEdataRef2: " + dataRef2)
            const z = await getDoc(doc(db, collectionName, dataRef2));
            usage = z.data();
             //console.log("USAGE: " + usage);
            const temp = usage[currentYear];
             //console.log("TEMP: " + temp);
            dummyDataSet[dept] = temp;  
        }
        this.dataSet = dummyDataSet;
     }
    }
};
</script>

<style>
#options {
  display: inline-block;
  margin-left: 5em;
}

#title {
  display: inline-block;
  margin-right: 0.5em;
}
</style>
