import React, { useContext, useEffect, useState } from "react"
import styles from "../PagesStyles/SignInPage.module.scss"
import { useNavigate } from "react-router-dom"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth"
import { Context } from "../Context/Context"
import { doc, getDoc, setDoc } from "firebase/firestore"

function SignInPage() {
  const { auth, db } = useContext(Context)

  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")

  const navigate = useNavigate()

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "userDetails", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists() && docSnap.data().phoneNumber) {
          navigate("/")
        } else {
          console.log("no phonenumber yet")
          setStep(2)
        }
      } else {
        setStep(1)
      }
    })
  }

  useEffect(() => {
    checkAuthState()
  }, [])

  async function handleSubmit() {
    await setDoc(doc(db, "userDetails", auth.currentUser.uid), { phoneNumber })
    checkAuthState()
  }

  return (
    <div className={styles.SignInPage}>
      <span className={styles.circle}></span>
      <span className={styles.circle2}></span>
      <div className={styles.SignCard}>
        <a href="/" className={styles.x}>
          X
        </a>
        <img
          src="https://i.ibb.co/FbYmSWK/295781324-106007968866648-7179000139374969956-n.jpg"
          alt=""
        />
        <div>
          <div
            className={styles.step1}
            style={{ display: step === 1 ? "block" : "none" }}
          >
            <h2>Step 1 of 2</h2>
            <h1>Sign In</h1>
            <button onClick={signInWithGoogle}>
              <i className="ri-google-fill"></i> Sign In With Google
            </button>
          </div>
          <div
            className={styles.step2}
            style={{ display: step === 2 ? "block" : "none" }}
          >
            <h2>Step 2 of 2</h2>
            <h1>Add Your Phone Number</h1>
            <form>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
