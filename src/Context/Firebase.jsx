import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDk49_65SrDXQZl6KAHe0BYvCVXi5MNcZs",
  authDomain: "onlineordering-7e580.firebaseapp.com",
  projectId: "onlineordering-7e580",
  storageBucket: "onlineordering-7e580.appspot.com",
  messagingSenderId: "1038081568700",
  appId: "1:1038081568700:web:4a6f4590fbb15fc6e285b9",
  measurementId: "G-CVVMCE3EG0",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
