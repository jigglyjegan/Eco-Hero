<template>
  <div v-if= "user">
      <h2> YEARLY CARBON EMISSIONS </h2>
      <div class="card">
              <fa icon = "smog" />
      </div>
    <line-chart :data="this.dataSet" xtitle="Year"  ytitle="Carbon Emissions (metric tons) "></line-chart>
    
  </div>
</template>



<script>
import firebaseApp from "@/firebase.js";
//import { onMounted, reactive } from "@vue/runtime-core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'chartkick/chart.js';
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
//var usage = {};

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
      
      const currentDate = new Date();
      
      const currentYear = currentDate.getFullYear();
      
      console.log("CURRENT YEAR: " + currentYear);
      
      var uid = user.uid
      
      //var graphData = []

      
      this.dataList = []

      var depts = await getDoc(doc(db, 'depts', uid))
      depts = depts.data()
      var res = {} // This the output we want
      
      for (const [dept, bool] of Object.entries(depts)) {
        console.log(bool);
        //console.log(dept);
        var dkey = uid + dept;
        var dUsage = await getDoc(doc(db,'carbonUsageYrly', dkey))
        dUsage = dUsage.data();
        for (const [year, value] of Object.entries(dUsage)) {
          if (year in res) {
            res[year] += value;
          } else { 
            res[year] = value;
          }
        }
      }
      
      this.dataSet = res;
      console.log(this.dataSet);
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
