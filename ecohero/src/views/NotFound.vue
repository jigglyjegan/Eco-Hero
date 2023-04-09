<template>
  <div style="text-align: center">
    <TopBar />
    <h1>Page Not Found!!</h1>
    <h2>Please click on the available options above</h2>
    <BottomBar />
    <br />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopBar from '@/components/TopBar.vue';
import BottomBar from '@/components/BottomBar.vue';

export default {
  name: "NotFound",

  components: {
    TopBar,
    BottomBar
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