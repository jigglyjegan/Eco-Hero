<template>
  <NewTopBar />
  <div v-if= "user">
    <h1>Overview</h1>
  <div id = "electric">
    
  <ElectricOverview/>
  <ElectricBest/>
  </div>
  <CarbonOverview/>
  <CarbonBest/>
  <WaterOverview/> 
  <WaterBest/>
  <BottomBar />
  <Logout/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from "@/components/BottomBar.vue";
//import TopBar from "@/components/TopBar.vue";
import ElectricOverview from "@/components/ElectricOverview.vue";
import ElectricBest from "@/components/ElectricBest.vue";
import NewTopBar from "@/components/NewTopBar.vue";
import CarbonBest from "@/components/CarbonBest.vue";
import CarbonOverview from "@/components/CarbonOverview.vue";
import WaterOverview from "@/components/WaterOverview.vue";
import WaterBest from "@/components/WaterBest.vue";
import Logout from "@/components/Logout.vue"


export default {
  components: {
    BottomBar,
    ElectricOverview,
    ElectricBest,
    NewTopBar,
    CarbonBest,
    CarbonOverview,
    WaterOverview,
    WaterBest,
    Logout
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
};
</script>

<style>

</style>