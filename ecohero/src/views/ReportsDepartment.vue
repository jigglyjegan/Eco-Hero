<template>
  <NewTopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    <h1> Reports at Department Level </h1>
  </div>
  <ChartDepartment/>
  <Footer/>
  <Logout/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NewTopBar from "@/components/NewTopBar.vue";
import ChartDepartment from "@/components/ChartDepartment.vue";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"


export default {
  components: {
    Footer,
    NewTopBar,
    ChartDepartment,
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