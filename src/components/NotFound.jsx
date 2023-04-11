import React from "react"
import styles from "../styles/NotFound.module.scss"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h1>
        Not Found <Link to="/Home">Home</Link>
      </h1>
    </div>
  )
}

export default NotFound
