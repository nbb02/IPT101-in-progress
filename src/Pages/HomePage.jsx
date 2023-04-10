import React, { useContext } from "react"
import Orders from "../components/Orders"
import Home from "../components/Home"
import styles from "../PagesStyles/HomePage.module.scss"
import { Context } from "../Context/Context"

function HomePage() {
  const { cart } = useContext(Context)

  const orderTabOpen = cart.length > 0

  return (
    <div
      className={styles.HomePage}
      style={orderTabOpen ? {} : { gridTemplateColumns: "auto" }}
    >
      <div className={styles.HomeTab}>
        <Home />
      </div>
      <div
        className={styles.OrdersTab}
        style={orderTabOpen ? {} : { display: "none" }}
      >
        <Orders />
      </div>
    </div>
  )
}

export default HomePage
