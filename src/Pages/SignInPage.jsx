import React, { useContext, useRef, useState } from "react"
import styles from "../PagesStyles/SignInPage.module.scss"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context/Context"

function SignInPage() {
  const [isSignIn, setSignIn] = useState(true)
  const navigate = useNavigate()
  const { signIn, signUp } = useContext(Context)
  const [signUpData, setSignUpData] = useState({
    user: "",
    pass: "",
    firstName: "",
    lastName: "",
  })

  let username = useRef(null)
  let password = useRef(null)

  function hasAccess(obj) {
    if (signIn(obj)) navigate("/")
    else {
      alert("SignIn Failed")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target

    setSignUpData((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  function handleSignUp(e) {
    e.preventDefault()
    const hasBlanks = Object.values(signUpData).some(
      (item) => item.trim() === ""
    )

    if (!hasBlanks) {
      signUp(signUpData)
      navigate("/")
    } else {
      alert("Please fill up all blanks")
    }
  }

  return (
    <div className={styles.SignInPage}>
      <span className={styles.circle}></span>
      <span className={styles.circle2}></span>
      <div
        className={styles.SignInCard}
        style={isSignIn ? { display: "flex" } : { display: "none" }}
      >
        <img
          src="https://i.ibb.co/FbYmSWK/295781324-106007968866648-7179000139374969956-n.jpg"
          alt=""
        />
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
      <div
        className={styles.SignUpCard}
        style={isSignIn ? { display: "none" } : { display: "flex" }}
      >
        <img
          src="https://i.ibb.co/FbYmSWK/295781324-106007968866648-7179000139374969956-n.jpg"
          alt=""
        />
        <h1>Sign Up</h1>
        <form>
          <label htmlFor="">Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="user"
            value={signUpData.user}
          />
          <label htmlFor="">Password</label>
          <input
            type="text"
            onChange={handleChange}
            name="pass"
            value={signUpData.pass}
          />
          <label htmlFor="">First name</label>
          <input
            type="text"
            onChange={handleChange}
            name="firstName"
            value={signUpData.firstName}
          />
          <label htmlFor="">Last name</label>
          <input
            type="text"
            onChange={handleChange}
            name="lastName"
            value={signUpData.lastName}
          />
          <button type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <div>
          <h5>Already have an account ? </h5>
          <button onClick={() => setSignIn(!isSignIn)}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
