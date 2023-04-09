<template>
    <div v-if="user"> 
        <h1>Your current metrics</h1>
        <p>Click here to refresh</p>
        <button id = "refreshbutton" type = "button" v-on:click="graphData(this.user)">Refresh</button>
        <p>Carbon Emissions</p>
        <pie-chart :donut="true" :data="this.dataCarbon" :colors="['red', 'turquoise']"></pie-chart>
        <p>Water Usage</p>
        <pie-chart :donut="true" :data="this.dataWater" :colors="['red', 'turquoise']"></pie-chart>
        <p>Electricity Usage</p>
        <pie-chart :donut="true" :data="this.dataElectric" :colors="['red', 'turquoise']"></pie-chart>

 
    </div>
    

  
</template>

<script>
import firebaseApp from "@/firebase.js";
//import { onMounted, reactive } from "@vue/runtime-core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'chartkick/chart.js';
import { getFirestore, getDoc, doc, setDoc} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
 
    data() {
        return {
         user: false,
         dataElectric: {},
         dataWater: {},
         dataCarbon: {},

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
        async graphData(user) {
            var uid = user.uid
            console.log(uid)
            const date = new Date()
            var month = date.getMonth() + 1
            if (month < 10){
                var monthName = String(month).padStart(2,'0')
            }
            else {
                monthName = String(month)
            }
            console.log("month:" + monthName)
            const year = date.getFullYear()

            var userThreshold = await getDoc(doc(db, "/limits", uid))
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
                    if (electricityThresholdValue - thisMonthElectric <= 0 ){
                        this.dataElectric = {'Used': thisMonthElectric, 'Left': 0}
                    } else {
                    this.dataElectric = {'Used': thisMonthElectric, 'Left': electricityThresholdValue - thisMonthElectric}
                    }

                    if (waterThresholdValue - thisMonthWater <= 0 ){
                        this.dataWater = {'Used': thisMonthWater, 'Left': 0}
                    }
                    else{
                        this.dataWater = {'Used': thisMonthWater, 'Left': waterThresholdValue - thisMonthWater}
                    }

                    if (carbonThresholdValue - thisMonthCarbon <= 0 ){
                        this.dataCarbon = {'Used': thisMonthCarbon, 'Left': 0}
                    }
                    else{
                        this.dataCarbon = {'Used': thisMonthCarbon, 'Left': carbonThresholdValue - thisMonthCarbon}
                    }
                
            } else{
                alert("you have no data!")
            }

        }
    }


}
</script>

<style>

</style>