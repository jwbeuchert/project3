import app from "firebase";

var config = {
  apiKey: "AIzaSyDNmfzkDxKXOPi2B5YnYhNIOnC3JIOPsus",
  authDomain: "gift-together.firebaseapp.com",
  databaseURL: "https://gift-together.firebaseio.com",
  projectId: "gift-together",
  storageBucket: "gift-together.appspot.com",
  messagingSenderId: "834835848957",
  appId: "1:834835848957:web:6b2161247c2600e051a894"
};

app.initializeApp(config);

export const auth = app.auth();
export default app;
