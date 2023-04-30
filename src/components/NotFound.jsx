import React, { useContext } from "react"
import styles from "../styles/NotFound.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../Context/Context"

function NotFound() {
  const navigate = useNavigate()
  const { access } = useContext(Context)
  return access.access ? (
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
