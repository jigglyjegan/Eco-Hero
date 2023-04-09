<template>
  <div v-if= "user">
    <div id ="options">
      <div id = "title">
        <h3 style = "color: black"> Period: </h3>
      </div>
      <select id = "type" @onchange="selectNum" v-model = "selected">
        <option disabled value="">Please select one</option>
        <option value="day">By Day</option>
        <option value="month">By Month</option>
        <option value="year">By Year</option>
      </select>
    </div>

    <div id = "options">
      <div id = "title">
        <h3 style = "color: black"> Metric :</h3>
      </div>
      <select id = "metric" @onchange="selectNum" v-model = "selected1">
        <option disabled value="">Please select one</option>
        <option value="elecUsage">Electricity</option>
        <option value="waterUsage">Water</option>
        <option value="carbonUsage">Carbon</option>
      </select>
    </div>

    <button id = "savebutton" type = "button" v-on:click="graphData(this.user)">Go</button>
    <line-chart :data="this.dataList"></line-chart>
    
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
      }
    });
  },

  //idea is to have a go button to refresh the page which are going to have new values
  methods: {
    

    async graphData(user) {
      //get realtime year and month
      const currentDate = new Date();
      const currentMonth = "0" + (currentDate.getMonth() + 1);
      //to change when anthony inputs 2022 data
      const currentYear = currentDate.getFullYear();
      //const currentYear = "2019"
      console.log("CURRENT YEAR: " + currentYear);
      
      var uid = user.uid
      //console.log("UID: " + uid)
      var selectType = document.getElementById('type');
      var valueType = selectType.options[selectType.selectedIndex].value;
      var selectMetric = document.getElementById('metric');
      var valueMetric = selectMetric.options[selectMetric.selectedIndex].value;
      //var selectDept = document.getElementById('dept');
      //var valueDept = selectDept.options[selectDept.selectedIndex].value;

      var graphData = []

      if (valueType == "day") {
        this.dataList = []
        const collectionName = valueMetric + "Daily";
        //console.log("COLLECTION: " + collectionName);
        var departments = await getDoc(doc(db, "depts", uid));
        var departmentsData = departments.data();
      
        //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid and "2018" to currYear
        //var dataRef = uid + valueDept + currentYear + currentMonth
        //test code 
        for (const [dept, bool] of Object.entries(departmentsData)) {
          console.log(bool)
          var dataRef = uid + dept + currentYear + currentMonth
          //console.log("DAY DATAREF :" + dataRef)
          const z = await getDoc(doc(db, collectionName, dataRef));
          usage = z.data();
          const objectArray = Object.entries(usage);
          //console.log(objectArray)
          var sortedArray = objectArray.sort(function(a, b) { return a[0] - b[0]; });
          //this.dataSet = sortedArray;

          for (var i = 0; i < sortedArray.length; i++) {
            const key = sortedArray[i][0]
            const keyString = key.toString()
            sortedArray[i][0] = keyString
          }
          
          const temp = {"name": dept, data: sortedArray};
          graphData.push(temp);
      
        }
        this.dataList = graphData
      } else if (valueType == "month") {
        this.dataList = []
        const collectionName = valueMetric + "Mthly";
        //console.log("COLLECTION: " + collectionName);
        var departments1 = await getDoc(doc(db, "depts", uid));
        var departmentsData1 = departments1.data();
      
        //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid and "2018" to currYear
        //var dataRef = uid + valueDept + currentYear + currentMonth
        //test code 
        for (const [dept, bool] of Object.entries(departmentsData1)) {
          console.log(bool)
          var dataRef1 = uid + dept + currentYear
          console.log("DAY DATAREF :" + dataRef1)
          const z = await getDoc(doc(db, collectionName, dataRef1));
          usage = z.data();
          console.log(usage)
          const objectArray = Object.entries(usage);
          //console.log(objectArray)
          var sortedArray1 = objectArray.sort(function(a, b) { return a[0] - b[0]; });
          //this.dataSet = sortedArray;

          for (var ii = 0; ii < sortedArray1.length; ii++) {
            const key = sortedArray1[ii][0]
            const keyString = key.toString()
            sortedArray1[ii][0] = keyString
          }
          
          const temp = {"name": dept, data: sortedArray1};
          graphData.push(temp);
      
        }
        this.dataList = graphData
      } else if (valueType == "year") {
        this.dataList = []
        const collectionName = valueMetric + "Yrly";
        //console.log("COLLECTION: " + collectionName);
        var departments2 = await getDoc(doc(db, "depts", uid));
        var departmentsData2 = departments2.data();
      
        //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid and "2018" to currYear
        //var dataRef = uid + valueDept + currentYear + currentMonth
        //test code 
        for (const [dept, bool] of Object.entries(departmentsData2)) {
          console.log(bool)
          var dataRef2 = uid + dept
          //console.log("DAY DATAREF :" + dataRef)
          const z = await getDoc(doc(db, collectionName, dataRef2));
          usage = z.data();
          const objectArray = Object.entries(usage);
          //console.log(objectArray)
          var sortedArray2 = objectArray.sort(function(a, b) { return a[0] - b[0]; });
          //this.dataSet = sortedArray;

          for (var iii = 0; iii < sortedArray2.length; iii++) {
            const key = sortedArray2[iii][0]
            const keyString = key.toString()
            sortedArray2[iii][0] = keyString
          }
          
          const temp = {"name": dept, data: sortedArray2};
          graphData.push(temp);
      
        }
        this.dataList = graphData
      }
      }
  }
};
</script>

<style>
#options {
  display: inline-block;
  margin-left: 5em;
  color: black;
}

#title {
  display: inline-block;
  margin-right: 0.5em;
  color: black;
}
</style>
