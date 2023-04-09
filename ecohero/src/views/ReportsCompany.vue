<template>
  <NewTopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    <h1>Reports at Company Level</h1>
  </div>
  <ChartCompany/>
  <Footer />
  <Logout/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NewTopBar from "@/components/NewTopBar.vue";
import ChartCompany from "@/components/ChartCompany.vue";
import Footer from "@/components/Footer.vue"
import Logout from "@/components/Logout.vue"


export default {
  components: {
    NewTopBar,
    ChartCompany,
    Footer,
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