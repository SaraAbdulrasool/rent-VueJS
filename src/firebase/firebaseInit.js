import firebase from 'firebase'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyBo8GYFytyzKDSNT0RgU3xKTj3D4QF1eAQ",
    authDomain: "rent-a-property-95c94.firebaseapp.com",
    projectId: "rent-a-property-95c94",
    storageBucket: "rent-a-property-95c94.appspot.com",
    messagingSenderId: "335419428980",
    appId: "1:335419428980:web:e3118806763e19d0518121",
    measurementId: "G-M6V5SBPWSF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
db.settings({timestampsInSnapshots: true})
const auth = firebase.auth()
export default db

