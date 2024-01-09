import React, { useContext } from "react"
import styles from "../styles/NotFound.module.scss"
import { Link } from "react-router-dom"
import { Context } from "../Context/Context"

function NotFound() {
  const { cookies } = useContext(Context)
  return cookies ? (
    <div className={styles.NotFound}>
      <h1>
        Not Found <Link to="/">Home</Link>
      </h1>
    </div>
  ) : (
    <div className={styles.NotFound}>
      <h1>
        Not Found <Link to="/signin">SignIn</Link>
      </h1>
    </div>
  )
}

export default NotFound
