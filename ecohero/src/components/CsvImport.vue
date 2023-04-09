<template>
  <div v-if="user">
    <h2>Upload your data here</h2>
    <p>Please upload your data in CSV format here</p>
    <form id="uploadForm">
      <input type="file" id="inputFile" accept=".csv" placeholder="Upload File Here"/>
      <button id="savebutton" type="button" v-on:click="uploadFile()">
        Upload
      </button>
    </form>
  </div>


</template>

<script>
import firebaseApp from "@/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; // For updating db
import { getStorage, ref, uploadBytes } from "firebase/storage"; // For uploading csv
import { updateFs } from "@/dataReading.js" // For populating Firestore with csv data

const db = getFirestore(firebaseApp);
const storage = getStorage();

export default {
  data() {
    return {
      user: false,
      file: "",
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
    async uploadFile() {
      // First we get the file
      var file = document.getElementById("inputFile").files[0];
      var ext = file.name.split(".")[1];
      if (ext != "csv") {
        // Verify file type
        alert("Please upload a valid file");
        document.getElementById("uploadForm").reset(); // User can now upload a new file
      } else {
        // Now we get the variables we need to construct our file path
        var uid = this.user.uid;
        var today = new Date();
        // var timeStamp = today.toString();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        var todayString = String(dd + mm + yyyy);
        var fileName = uid + todayString; // Construct unique fileName

        var storageRef = ref(storage, fileName); // Construct storage reference

        try {
          // Now we upload the file to file storage
          uploadBytes(storageRef, file);
          // After uploading, we store the metadata for easy retrieval of file in future
          const docRef = await setDoc(
            doc(db, "dataUploads", uid, String(yyyy), String(mm)),
            {
              //update metadata into firestore
              [String(dd)]: fileName, // We'll need this to create the ref if we want to del this file
            }
          );
          console.log(docRef);
          // Now we parse the csv file data into firebase using our custom function...
          updateFs(file, uid);
          document.getElementById("uploadForm").reset(); // User can now upload a new file
          this.$emit("added"); // Emit so that we can update the table of files
        } catch (error) {
          // Error catching if necessary
          console.error("Error: ", error);
        }
      }
    },
  },
};
</script>

<style></style>
