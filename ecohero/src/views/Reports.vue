<template>
  <TopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    This is our Reports Page
  </div>
  <Chart/>
  <Footer />
  <Logout/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import TopBar from "@/components/TopBar.vue";
import Chart from "@/components/Chart.vue";


export default {
  components: {
    Footer,
    Logout,
    TopBar,
    Chart
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