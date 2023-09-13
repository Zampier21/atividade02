
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC8zv9RH-Aetxl7cfm1wxmVLIYYUuqohu4",
  authDomain: "trilhadoestudante-23b83.firebaseapp.com",
  projectId: "trilhadoestudante-23b83",
  storageBucket: "trilhadoestudante-23b83.appspot.com",
  messagingSenderId: "113199600295",
  appId: "1:113199600295:web:2101ee3dac696589108182",
  measurementId: "G-S76DRY10EH"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };