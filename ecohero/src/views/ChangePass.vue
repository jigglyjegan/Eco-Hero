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
  <div class="container" >
    <NewTopBar/>
    <form id="userForm">
        <h1 class="headerDiv">Change Password</h1>
        <input type="text" id="email" required="" placeholder="Email" />
        <br /><br />

        <input type="text" id="pwd" required="" placeholder="Old Password" />
        <br /><br />

        <input type="text" id="newPwd" required="" placeholder="New Password" />
        <br /><br />

        <button id="change" type="button" v-on:click="changePass()">
          Change Password
        </button>
        <br /><br />
      </form>
      <Footer/>
      <Logout/>
    </div>


</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/uifire.js";
import Logout from "@/components/Logout.vue"
import Footer from "@/components/Footer.vue"
import NewTopBar from '@/components/NewTopBar.vue'


export default {
  components:{
    NewTopBar,
    Logout,
    Footer
  },
  data() {
    return {
      user: false,
      error: null,
      correctCredential: false
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
    changePass(){
      this.error = null;
      this.correctCredential = false;
      //var email = document.getElementById("email").value;
      var pwd = document.getElementById("pwd").value;
      var newPwd = document.getElementById("newPwd").value;

      this.reauthenticate(pwd).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPwd).then(() => {
      alert("Password updated!");
      this.$router.push({name: 'Login'});
      }).catch((error) => { alert(error); });
      }).catch((error) => { alert(error); });

  
    },
    reauthenticate(currentPassword) {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }




  }
  
  
};
</script>

<style>
  #container{
    color: white;
  }
 

</style>