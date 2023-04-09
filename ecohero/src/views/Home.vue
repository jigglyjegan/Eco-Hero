<template>
  <NewTopBar />
  <Welcome />
  <img src="../assets/ecohero.png" alt="" class="logo">
  <!--<GetStarted />-->
  <HomeChart/>
  <Footer/>
  <Logout/>
</template>

<script>
import NewTopBar from '@/components/NewTopBar.vue'
import Welcome from "@/components/Welcome.vue";
//import GetStarted from "@/components/GetStarted.vue";
//import BottomBar from "@/components/BottomBar.vue";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import HomeChart from "@/components/HomeChart.vue"

export default {
  name: "Home",
  components: {
    Welcome,
   // GetStarted,
   // BottomBar,
    NewTopBar,
    Logout,
    Footer,
    HomeChart
  },
};
</script>

<style scoped>
  .logo{
    display: block;
    width: 25%;
    margin-left: auto;
    margin-right:auto;
  }
</style>