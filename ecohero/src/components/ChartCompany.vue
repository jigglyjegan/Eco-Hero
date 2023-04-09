<template>
  <div v-if= "user">
    <div id = "options">
      <div id = "title">
        <h3 style = "color: black"> Metric :   </h3>
      </div>
      <select id = "metric" @onchange="selectNum" v-model = "selected3">
        <option disabled value="">Please select one</option>
        <option value="elecUsage">Electricity</option>
        <option value="waterUsage">Water</option>
        <option value="carbonUsage">Carbon</option>
      </select>
    </div>

    <div id = "options">
      <div id = "title">
        <h3 style = "color: black"> Month :</h3>
      </div>
      <select id = "month" @onchange="selectNum" v-model = "selected">
        <option disabled value="">Please select one</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>

    <div id = "options">
      <div id = "title">
        <h3 style = "color: black"> Year :</h3>
      </div>
      <select id = "year" @onchange="selectNum" v-model = "selected1">
        <option disabled value="">Please select one</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
      </select>
    </div>

    <div id = "options">
      <div id = "title">
        <h3 style = "color: black"> Department :</h3>
      </div>
      <select id = "dept" @onchange="selectNum" v-model = "selected2">
        <option disabled value="">Please select one</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>  
        <option value="Logistics"> Logistics </option>
      </select>
    </div>

    <button id = "savebutton" type = "button" v-on:click="graphData(this.user)">Go</button>
    <column-chart :data="this.dataSet"  xtitle = "Day"   ytitle = "Amount"></column-chart>
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
      selected3: '',
      dataSet: {},
      department: "",
      year: "",
      month: ""
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
    refresh(){
        window.location.reload()
    },

    async graphData(user) {
      var uid = user.uid
      console.log(uid)
      var selectMonth = document.getElementById('month');
      var valueMonth = selectMonth.options[selectMonth.selectedIndex].value;
      var selectYear = document.getElementById('year');
      var valueYear = selectYear.options[selectYear.selectedIndex].value;
      var selectDept = document.getElementById('dept');
      var valueDept = selectDept.options[selectDept.selectedIndex].value;
      var selectMetric = document.getElementById('metric');
      var valueMetric = selectMetric.options[selectMetric.selectedIndex].value + "Daily";
      //change "RcKRjeuP7ybC3KxJsDBthyQrDlI3" to uid
      var dataRef = uid + valueDept + valueYear + valueMonth
      // console.log(dataRef)
      //include dropdown option for collection
      const z = await getDoc(doc(db, valueMetric, dataRef))
      usage = z.data()
      
      const objectArray = Object.entries(usage);

      // objectArray.forEach(([key, value]) => {
      //   console.log(key); 
      //   console.log(value); 
      // });

      var sortedArray = objectArray.sort(function(a, b) { return a[0] - b[0]; });


      // console.log(sortedArray)
      this.dataSet = sortedArray;
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
