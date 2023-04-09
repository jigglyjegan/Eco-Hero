<template>
  <NewTopBar />
  <AboutApp />
  <img src="../assets/ecohero.png" alt="" class="logo">
  <Mission/>
  <Team/>
  <Footer/>
  <Logout/>

</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AboutApp from "@/components/AboutApp.vue";
import NewTopBar from "@/components/NewTopBar.vue";
import Mission from "@/components/Mission.vue"
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import Team from "@/components/Team.vue"

export default {
  name: "About",
  components: {
    AboutApp,
    NewTopBar,
    Logout,
    Mission,
    Team,
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