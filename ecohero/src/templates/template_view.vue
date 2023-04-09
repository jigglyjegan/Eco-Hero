// This file is a standard template with all the user auth added in.
// For standardisation purposes, we will hence make our views 
// using this template.

// Changelog:
// V0: Created template
// V1: Added Top NavBar and Bottom NavBar

// INSTRUCTIONS for use
// 1) Make a COPY of this file
// 2) Rename the COPY to the filename needed
// 3) Do everything inside your COPY of this file
// 4) Delete this comment

// Note: DO NOT MODIFY THIS FILE.

<template>
  <TopBar />
  <div v-if= "user">
    <!-- Add stuff here -->
    Replace with page's content
  </div>
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BottomBar from '@/components/BottomBar.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  components: { 
    BottomBar,
    TopBar 
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
}

</script>

<style>
</style>