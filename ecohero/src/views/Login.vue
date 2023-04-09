<template>
  <NewTopBar />
  <div style="text-align: center">
    <form id="userForm">
      <h1 class="headerDiv">Sign in to EcoHero</h1>
      <input type="text" id="email" required="" placeholder="Email" />
      <br /><br />

      <input type="text" id="pwd" required="" placeholder="Password" />
      <br /><br />

      <button id="savebutton" type="button" v-on:click="signIn()">
        Sign In
      </button>
      <br /><br />
    </form>
    <div id="firebaseui-auth-container"></div>
  </div>
  <!--<BottomBar />-->
  <Footer/>
</template>

<script>
import firebase from "@/uifire.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
//import BottomBar from "@/components/BottomBar.vue";
import NewTopBar from "@/components/NewTopBar.vue";
import Footer from "@/components/Footer.vue"

export default {
  name: "Login",

  components: {
    //BottomBar,
    NewTopBar,
    Footer
  },

  methods: {
    // ------------ Register User using our custom auth ------------ //
    async signIn() {
      var email = document.getElementById("email").value;
      var pwd = document.getElementById("pwd").value;

      try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pwd).then(
          () => {
            this.$router.push("/");
          }
        );
      } catch (error) {
        console.error("Error signing in: ", error);
      }
    },
  },

  mounted() {
    //Calling UI instance
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      // We only create the instance once
      // Initialise the FirebaseUI widget using Firebase.
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiconfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiconfig);
  },
};
</script>

<style scoped>
h1 {
  text-align: c;
}

#firebaseui-auth-container {
  margin-top: 50px;
  margin-bottom: 50px;
}

#mainHead {
  text-align: center;
  text-shadow: 2px 2px grey;
}

#bg {
  margin-top: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

h2 {
  text-align: center;
  color: aliceblue;
}
</style>