import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAoDkNZPHi57wVNfSjEKYPATejnbPXFzSM",
  authDomain: "ecohero-be7b4.firebaseapp.com",
  projectId: "ecohero-be7b4",
  storageBucket: "ecohero-be7b4.appspot.com",
  messagingSenderId: "1067396827150",
  appId: "1:1067396827150:web:c1b3cf738fece47842545f"
};
// Initialise Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
