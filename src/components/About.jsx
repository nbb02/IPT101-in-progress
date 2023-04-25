import React from "react"
import styles from "../styles/About.module.scss"

function About() {
  return (
    <div>
      <div className={styles.Banner}>
        <h1>About us</h1>
      </div>
      <div className={styles.About}>
        <h2>Welcome to the CitaDel's Bistro</h2>

        <p>
          #6 FV. Ileto Street Poblacion, San Ildefonso, Philippines, 3010
          Address
        </p>
        <p>0991 840 7554 Mobile</p>
        <p>Open Hours : 8:00 am to 8:00 pm</p>
        <a href="https://web.facebook.com/profile.php?id=100083633456266&sk=about">
          Facebook Page
        </a>
      </div>
    </div>
  )
}

export default About
