import React, { useContext, useState } from "react"
import styles from "../PagesStyles/SignInPage.module.scss"
import { db } from "../Context/Firebase"
import { getDocs, collection, query, where, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context/Context"

function SignInPage() {
  const [isSignedIn, setSignIn] = useState(true)
  const [signInData, setSignInData] = useState({ username: "", password: "" })

  const [signUpData, setSignUpData] = useState({ username: "", password: "" })
  console.log(signUpData)

  const navigate = useNavigate()

  const { handleSignIn, setCookie } = useContext(Context)

  async function signIn() {
    const { username, password } = signInData
    let userData
    const q = query(
      collection(db, "Users"),
      where("username", "==", username),
      where("password", "==", password)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => (userData = doc.data()))
    if (userData) {
      handleSignIn(username, userData.isAdmin)
      navigate("/")
    } else {
      alert("Sign in Failed : Check Email or Password")
    }
  }

  async function signUp() {
    const { username, password } = signUpData

    let usernameData

    const q = query(collection(db, "Users"), where("username", "==", username))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => (usernameData = doc.data()))
    console.log(usernameData)

    if (!usernameData) {
      console.log(usernameData)
      await addDoc(collection(db, "Users"), { username, password })
      console.log("sign up success")
      setCookie("user", { username: username }, { path: "/" })
      navigate("/")
    } else {
      alert("Number already existed")
    }
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
        <div
          className={styles.SignUpBox}
          style={isSignedIn ? { display: "block" } : { display: "none" }}
        >
          <h1>Sign Up</h1>
          <form>
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              value={signUpData.username}
              onChange={(e) => {
                setSignUpData((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }}
            />
            <label htmlFor="">Set Password</label>
            <input
              type="text"
              value={signUpData.password}
              onChange={(e) => {
                setSignUpData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                signUp()
              }}
            >
              Sign Up
            </button>
          </form>
          <div>
            <h5>Already have an account ? </h5>
            <button onClick={() => setSignIn(!isSignedIn)}>Sign In</button>
          </div>
        </div>

        <div
          className={styles.SignInBox}
          style={!isSignedIn ? { display: "block" } : { display: "none" }}
        >
          <h1>Sign In</h1>
          <form action="">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              onChange={(e) => {
                setSignInData((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }}
            />
            <label htmlFor="">Password</label>
            <input
              type="text"
              onChange={(e) => {
                setSignInData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign In
            </button>
          </form>

          <a href="">Forgot password?</a>
          <br />
          <span className={styles.google}>
            <i className="ri-google-fill ri-2x"></i>
          </span>
          <div>
            <h5>Dont have an account ? </h5>
            <button
              onClick={() => {
                setSignIn(!isSignedIn)
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
