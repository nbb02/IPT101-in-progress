import React, { useContext, useRef, useState } from "react"
import styles from "../PagesStyles/SignInPage.module.scss"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context/Context"

function SignInPage() {
  const [isSignIn, setSignIn] = useState(true)
  const navigate = useNavigate()
  const { SignIn } = useContext(Context)

  let username = useRef(null)
  let password = useRef(null)

  function hasAccess(obj) {
    if (SignIn(obj)) navigate("/home")
  }

  return (
    <div className={styles.SignInPage}>
      <div
        className={styles.SignInCard}
        style={isSignIn ? { display: "flex" } : { display: "none" }}
      >
        <h1>Sign In</h1>
        <label>Username</label>
        <input ref={username} type="text" />
        <label>Password</label>
        <input ref={password} type="text" />
        <a href="">Forgot password?</a>
        <button
          onClick={() =>
            hasAccess({
              user: username.current.value,
              pass: password.current.value,
            })
          }
        >
          Sign In
        </button>
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
      <div
        className={styles.SignUpCard}
        style={isSignIn ? { display: "none" } : { display: "flex" }}
      >
        <h1>Sign Up</h1>
        <form>
          <label htmlFor="">Username</label>
          <input type="text" />
          <label htmlFor="">Password</label>
          <input type="text" />
          <label htmlFor="">First name</label>
          <input type="text" />
          <label htmlFor="">Last name</label>
          <input type="text" />
        </form>
        <button>Sign Up</button>
        <div>
          <h5>Already have an account ? </h5>
          <button onClick={() => setSignIn(!isSignIn)}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
