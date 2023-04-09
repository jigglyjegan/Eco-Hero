<template>
  <TopBar />
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from "@/components/BottomBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "About",
  components: {
    BottomBar,
    TopBar,
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