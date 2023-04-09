<template>
  <NewTopBar />
  <div style="text-align: center">
    <img src="../assets/ecohero.png" alt="" class="logo">

  

    <form id="userForm">
      <h1 class="headerDiv">Create Account</h1>
      <p>Fill out our form or register using your Google account below!</p>
      <p id="caption">Start taking accountability today!</p>
      <input type="text" id="name" required="" placeholder="Name" />
      <br /><br />

      <input type="text" id="email" required="" placeholder="Email" />
      <br /><br />

      <input type="text" id="pwd" required="" placeholder="Password" />
      <br /><br />

      <input type="text" id="pwd2" required="" placeholder="Confirm Password" />
      <br /><br />

      <button id="savebutton" type="button" v-on:click="saveUser()">
        Sign Up
      </button>
      <br /><br />
    </form>

    <div id="firebaseui-auth-container"></div>
  </div>
  <Footer />
</template>

<script>
import firebase from "@/uifire.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import NewTopBar from '@/components/NewTopBar.vue';
import Footer from "@/components/Footer.vue"


export default {
  name: "Registration",

  components: { 
    NewTopBar,
    Footer
  },
  
  methods: {
    // ------------ Register User using our custom auth ------------ //
    async saveUser() {
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var pwd = document.getElementById("pwd").value;
      var pwd2 = document.getElementById("pwd2").value;

      if (pwd != pwd2) { // Pwds do not match
        alert("Passwords do not match. Please re-enter your password");
        // Wait for user to re-enter passwords then try signing up again
      } 
      else {
        try { 
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, pwd).
          then((userCredential) => {
            // Signed in 
            const user = userCredential.user; // Get User
            updateProfile(user, {
              displayName: name
            });
            document.getElementById("userForm").reset(); // User registered, reset form
            this.$router.push('/'); 
          });
        }  catch (error) {
            console.error("Error registering user: ", error);
        }
      }
    }
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
 
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

h3 {
  text-align: center;

}
.logo{
    display: block;
    width: 25%;
    margin-left: auto;
    margin-right:auto;
  }

</style>