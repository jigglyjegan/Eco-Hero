<template>
  <div v-if= "user">
      <h2 id = "elecOver"> YEARLY ELECTRICAL CONSUMPTION </h2>
      <div class="card">
              <fa icon = "bolt-lightning" />
      </div>
    <line-chart :data="this.dataSet" xtitle="Year" ytitle="Electricity Consumption (kWh)"></line-chart>
    
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
        var dUsage = await getDoc(doc(db,'elecUsageYrly', dkey))
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

H2 {
    
    background-color: #254441;
    right: 50%;
    transform: translate(0%,-0%);
    text-transform: uppercase;
    font-family: verdana;
    font-size: 1em;
    font-weight: 700;
    color: white;
    
}


</style>
