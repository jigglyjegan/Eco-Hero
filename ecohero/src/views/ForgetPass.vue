// This file is a standard template with all the user auth added in.
// For standardisation purposes, we will hence make our views 
// using this template.

// Changelog:
// V0: Created template

// INSTRUCTIONS for use
// 1) Make a COPY of this file
// 2) Rename the COPY to the filename needed
// 3) Do everything inside your COPY of this file
// 4) Delete this comment

// Note: DO NOT MODIFY THIS FILE.

<template>
  <NewTopBar/>
   <div style="text-align: center">
    <form id="userForm">
      <h1 class="headerDiv">Reset Password</h1>
      <input type="text" id="email" required="" placeholder="Email" />
      <br /><br />

      <button id="resetButton" type="button" v-on:click="sendEmail()">
        Reset
      </button>
      <br /><br />
    </form>
    <div id="firebaseui-auth-container"></div>
  </div>
  <Footer/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/uifire.js";
import Footer from "@/components/Footer.vue"
import NewTopBar from '@/components/NewTopBar.vue'



export default {
  components:{
    NewTopBar,
    Footer
  },
  data() {
    return {
      user: false,
      email: "",
      error: null,
      emailSending: false
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

  methods: {
    sendEmail() {
    var email = document.getElementById("email").value;
    if (!email) {
    this.error = "Please type in a valid email address.";
    return;
  }
  this.error = null;
  this.emailSending = true;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      this.emailSending = false;
      alert("Email sent!")
      this.$router.push("/");
    })
    .catch(error => {
      this.emailSending = false;
      this.error = error.message;
    });
}

  }
};
</script>

<style>
</style>