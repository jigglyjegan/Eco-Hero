<template>
  <body>
    <div id="nav" v-if="!user">
      <router-link to="/" v-if="user">Home</router-link> |
      <router-link to="/contactUs">Contact Us</router-link> |
      <router-link to="/forgetPass" v-if="!user"> Forget Password </router-link>
      <router-view />
    </div>
  </body>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
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
  }
}
</script>

<style scoped>
body {
  background-color: white;
}

.pte-ltd {
  height: 55px;
  color: gray;
  text-align-last: center;
  font-family: "Josefin Sans";
  font-size: 15px;
}

.nav {
  padding: 30px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: brown;
}

.nav a.router-link-exact-active {
  color: #32a96f;
}
</style>
