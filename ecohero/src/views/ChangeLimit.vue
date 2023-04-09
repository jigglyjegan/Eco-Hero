// This file is a standard template with all the user auth added in. // For
standardisation purposes, we will hence make our views // using this template.
// Changelog: // V0: Created template // INSTRUCTIONS for use // 1) Make a COPY
of this file // 2) Rename the COPY to the filename needed // 3) Do everything
inside your COPY of this file // 4) Delete this comment // Note: DO NOT MODIFY
THIS FILE.

<template>
  <div v-if="user">
    <NewTopBar />
    <img src="../assets/ecohero.png" alt="" />
    <h1>Change your thresholds here</h1>
    <p>
      This page allows you to set your thresholds for the 3 respective metrics
    </p>
    <p>If you exceed your limits, an alert will pop up!</p>
    <form id="form">
      <label for="carbon">Carbon (metric tonnes): </label>
      <input
        type="text"
        id="carbon"
        required=""
        placeholder="Enter Threshold"
      />
      <br /><br />
      <label for="water">Water (cubic metres): </label>
      <input type="text" id="water" required="" placeholder="Enter Threshold" />
      <br /><br />
      <label for="electricity ">Electricity (kWh): </label>
      <input
        type="number"
        id="electricity"
        required=""
        placeholder="Enter Threshold"
      />
      <br /><br />
      <div class="save">
        <button id="saveButton" type="button" v-on:click="savetofs()">
          Save
        </button>
        <p>Check if you have exceeded your thresholds here</p>
         <button id="checkButton" type="button" v-on:click="checkLimits()">
          Check
        </button>
        <br /><br />
      </div>
    </form>
    <Footer/>
    <Logout/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import NewTopBar from "@/components/NewTopBar.vue";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"

const db = getFirestore(firebaseApp);
export default {
  components: {
    NewTopBar,
    Logout,
    Footer
  },
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
    async savetofs() {
      var uid = this.user.uid;
      console.log(uid);
      this.carbon = document.getElementById("carbon").value;
      this.water = document.getElementById("water").value;
      this.electricity = document.getElementById("electricity").value;
      alert("Saving Metrics");
      try {
        const docRef = await setDoc(doc(db, "limits", uid), {
          electricity: this.electricity,
          water: this.water,
          carbon: this.carbon,
        });
        console.log(docRef);
        document.getElementById("form").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async checkLimits(){
      var notExceededAny = true
      const date = new Date()
      var month = date.getMonth() + 1
        if (month < 10){
          console.log("here")
          var monthName = String(month).padStart(2,'0')
        }
        else {
          monthName = String(month)
        }
      const year = date.getFullYear()
      var uid = this.user.uid;
      console.log(uid);

      var userThreshold = await getDoc(doc(db, "/limits", uid));
       if (userThreshold.exists()){
        var userThresholdValue = userThreshold.data() 
        console.log(userThresholdValue)
        var carbonThresholdValue = userThresholdValue['carbon']
        console.log(carbonThresholdValue)
        var waterThresholdValue = userThresholdValue['water']
        console.log(waterThresholdValue)
        var electricityThresholdValue = userThresholdValue['electricity']
        console.log(electricityThresholdValue)
      } else {
          setDoc(doc(db, "/limits", uid),{
            'carbon':0,
            'water':0,
            'electricity':0
            })

            carbonThresholdValue = 0
            waterThresholdValue = 0
            electricityThresholdValue = 0
                
        }

    
        var userDepartments = await getDoc(doc(db, "/depts", uid))
          if (userDepartments.exists()){
            var userDepartmentsData = userDepartments.data()
            var deptArray = []
            var thisMonthCarbon = 0;
            var thisMonthWater = 0;
            var thisMonthElectric = 0;
            for (var deptKey in userDepartmentsData){
              deptArray.push(deptKey)
              }
            console.log(deptArray)
            for (const dept of deptArray){
              console.log(dept)
              var dataRef = uid + String(dept) + year
              console.log(dataRef)
              var deptWater = await getDoc(doc(db, "/waterUsageMthly",dataRef))
              var deptCarbon = await getDoc(doc(db, "/carbonUsageMthly",dataRef))
              var deptElectricity = await getDoc(doc(db, "/elecUsageMthly",dataRef))
              var deptWaterValue = deptWater.data()
              var deptCarbonValue = deptCarbon.data()
              var deptElectricityValue = deptElectricity.data()
              console.log(deptWaterValue)
              console.log(deptCarbonValue)
              console.log(deptElectricityValue)
              thisMonthCarbon += deptCarbonValue[monthName];
              thisMonthElectric += deptElectricityValue[monthName];
              thisMonthWater += deptWaterValue[monthName];
              }
              if(waterThresholdValue < thisMonthWater){
                alert("You have exceeded your water usage limit")
                notExceededAny = false
              }
              if(carbonThresholdValue < thisMonthCarbon){
                alert("You have exceeded your carbon emissions limit")
                notExceededAny = false
              }
              if(electricityThresholdValue < thisMonthElectric){
                alert("You have exceeded your electricity usage limit")
                notExceededAny = false
              }

              if(notExceededAny){
                alert("No metrics exceeded")
              }

            } else{
                alert("you have no data!")
            }  
    

    }


  },
};
</script>

<style></style>
