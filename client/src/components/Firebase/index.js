import firebase from "firebase/app";
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDNmfzkDxKXOPi2B5YnYhNIOnC3JIOPsus",
  authDomain: "gift-together.firebaseapp.com",
  databaseURL: "https://gift-together.firebaseio.com",
  projectId: "gift-together",
  storageBucket: "gift-together.appspot.com",
  messagingSenderId: "834835848957",
  appId: "1:834835848957:web:6b2161247c2600e051a894"
};

firebase.initializeApp(firebaseConfig);

export default firebase
