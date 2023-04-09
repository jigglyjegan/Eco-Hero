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
  <Contact />
  <BottomBar />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Contact from "@/components/Contact.vue";
import BottomBar from "@/components/BottomBar.vue";

export default {
  name: "ContactUs",
  components: {
    Contact,
    BottomBar,
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
