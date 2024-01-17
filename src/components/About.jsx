import React from "react"
import styles from "../styles/About.module.scss"
import { Link } from "react-router-dom"

function About() {
  return (
    <div>
      <div className={styles.Banner}>
        <h1>About us</h1>
      </div>
      <div className={styles.About}>
        <h2>Welcome to the CitaDel's Bistro</h2>
        <p>We serve authentic Batangas cuisine</p>
        <Link to="/">Show Menu</Link>
        <p>
          Address : #6 FV. Ileto Street Poblacion, San Ildefonso, Philippines,
          3010
        </p>

        <p>Contact Number : 0991 840 7554 </p>
        <p>Open Hours : 9:00 am to 5:00 pm</p>
        <a href="https://web.facebook.com/profile.php?id=100083633456266&sk=about">
          <i className="ri-facebook-circle-fill ri-2x"></i>
        </a>
      </div>
    </div>
  )
}

export default About
