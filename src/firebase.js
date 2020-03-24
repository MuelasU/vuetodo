import firebase from "firebase/app";
import "firebase/firestore";

console.log(process.env.VUE_APP_PROJECT_ID);

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_PROJECT_ID + ".firebaseapp.com",
    databaseURL: "https://" + process.env.VUE_APP_PROJECT_ID + ".firebaseio.com",
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_PROJECT_ID + ".appspot.com",
    messagingSenderId: process.env.VUE_APP_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();