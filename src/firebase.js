import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBYL56_WKineca4tHdixq8W1I_i24Q0BOY",
  authDomain: "am-commits.firebaseapp.com",
  databaseURL: "https://am-commits.firebaseio.com",
  projectId: "am-commits",
  storageBucket: "am-commits.appspot.com",
  messagingSenderId: "385758133199",
  appId: "1:385758133199:web:d47df172b7b77d5328f0ba",
  measurementId: "G-DKRWHRN1JB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase
