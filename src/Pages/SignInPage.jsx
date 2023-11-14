import React, { useContext, useState } from "react"
import styles from "../PagesStyles/SignInPage.module.scss"
import { db } from "../Context/Firebase"
import { getDocs, collection, query, where } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context/Context"

function SignInPage() {
  const [isSignIn, setSignIn] = useState(true)
  const [signinData, setSignInData] = useState({ username: "", password: "" })
  const navigate = useNavigate()
  const { handleSignIn } = useContext(Context)

  function signUp() {}

  async function signIn() {
    const { username, password } = signinData
    let userData
    const q = query(
      collection(db, "Users"),
      where("username", "==", username),
      where("password", "==", password)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => (userData = doc.data()))
    if (userData) {
      handleSignIn(true, userData.isAdmin)
      navigate("/")
    } else {
      alert("Sign in Failed : Check Email or Password")
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
          style={isSignIn ? { display: "block" } : { display: "none" }}
        >
          <h1>Sign Up</h1>
          <form>
            <label htmlFor="">Phone Number</label>
            <input type="tel" />
            <label htmlFor="">Set Password</label>
            <input type="text" />
            <button>Sign Up</button>
          </form>
          <div>
            <h5>Already have an account ? </h5>
            <button onClick={() => setSignIn(!isSignIn)}>Sign In</button>
          </div>
        </div>

        <div
          className={styles.SignInBox}
          style={!isSignIn ? { display: "block" } : { display: "none" }}
        >
          <h1>Sign In</h1>
          <form action="">
            <label htmlFor="">Username/Phone Number</label>
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
                setSignIn(!isSignIn)
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
