import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAvwyuB4ROsw9TKvkMG1zao87JkKwCOkIE",
    authDomain: "crud-56569.firebaseapp.com",
    projectId: "crud-56569",
    storageBucket: "crud-56569.appspot.com",
    messagingSenderId: "191325751496",
    appId: "1:191325751496:web:26c33031f9fdd2c1e27dfd"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
  