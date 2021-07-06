import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDldThb5xH1eC6wC2D-B5JdkBmPy4HiLRI",
  authDomain: "todoapp-5fd57.firebaseapp.com",
  projectId: "todoapp-5fd57",
  storageBucket: "todoapp-5fd57.appspot.com",
  messagingSenderId: "332351367645",
  appId: "1:332351367645:web:68c193b6892961ea1eae34",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
