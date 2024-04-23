import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7EtW26mgXvKtAE4sqngUOhMyozS5OFrw",
  authDomain: "ecoride-web.firebaseapp.com",
  databaseURL: "gs://ecoride-web.appspot.com",
  projectId: "ecoride-web",
  storageBucket: "ecoride-web.appspot.com",
  messagingSenderId: "553671830978",
  appId: "1:553671830978:web:6ec7c078ec8671e6da3a5b",
  measurementId: "G-G21GJRX20F",
};

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// export { storage, firebase as default };
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
