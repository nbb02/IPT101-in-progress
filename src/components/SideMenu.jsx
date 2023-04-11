import React from "react"
import { Link } from "react-router-dom"
import styles from "../styles/SideMenu.module.scss"

function Menu() {
  return (
    <nav className={styles.Menu}>
      <label className={styles["menu-button"]}>
        <input type="checkbox" />
      </label>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Orders">My Orders</Link>
        </li>
        <li>
          <Link to="/Transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/Account">Account</Link>
        </li>
        <li>
          <Link to="/Admin">ADMIN</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
