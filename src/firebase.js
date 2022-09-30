import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDny2PTHVwy_gu4S76dDwlOMF51STuQMII",
  authDomain: "imageupload-8edb5.firebaseapp.com",
  projectId: "imageupload-8edb5",
  storageBucket: "imageupload-8edb5.appspot.com",
  messagingSenderId: "569228686173",
  appId: "1:569228686173:web:a11e7767ebadfb10012eb4"
};;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
