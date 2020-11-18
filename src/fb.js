import firebase from "firebase"
var firebaseConfig = {
  apiKey: "AIzaSyAhdCo7I7rkOVOth0U1LfF508HK96jS1Cc",
  authDomain: "qbar-ead98.firebaseapp.com",
  databaseURL: "https://qbar-ead98.firebaseio.com",
  projectId: "qbar-ead98",
  storageBucket: "qbar-ead98.appspot.com",
  messagingSenderId: "563825514775",
  appId: "1:563825514775:web:fe1cc64d290ca16dff7f52",
  measurementId: "G-Z5R62DSCL3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const func = firebase.functions();

export { db, auth, func }

auth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
