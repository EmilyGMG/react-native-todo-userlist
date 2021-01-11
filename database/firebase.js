import firebase from 'firebase'

import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyCRoP3TAYW3_XYTN7_MMnPXM4JNJ12srlk",
  authDomain: "react-native-firebase-3b87e.firebaseapp.com",
  projectId: "react-native-firebase-3b87e",
  storageBucket: "react-native-firebase-3b87e.appspot.com",
  messagingSenderId: "133413219533",
  appId: "1:133413219533:web:88d2d0593471468ed1cd84"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default {
  firebase,
  db,
};
