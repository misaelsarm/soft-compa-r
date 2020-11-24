import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyCARLeWgV4uIjQ2pRuDNHTnpms4RJN8UK0",
    authDomain: "soft-compa-r.firebaseapp.com",
    databaseURL: "https://soft-compa-r.firebaseio.com",
    projectId: "soft-compa-r",
    storageBucket: "soft-compa-r.appspot.com",
    messagingSenderId: "894571217203",
    appId: "1:894571217203:web:ad7791c08fbe334ef03e46"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
const db = firebase.firestore();
const storage = firebase.storage();
export {
    storage,
    db,
    firebase,
    secondaryApp
}