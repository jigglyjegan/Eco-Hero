import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// EcoHero's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoDkNZPHi57wVNfSjEKYPATejnbPXFzSM",
  authDomain: "ecohero-be7b4.firebaseapp.com",
  projectId: "ecohero-be7b4",
  storageBucket: "ecohero-be7b4.appspot.com",
  messagingSenderId: "1067396827150",
  appId: "1:1067396827150:web:c1b3cf738fece47842545f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export default firebaseApp; 
export { storage };