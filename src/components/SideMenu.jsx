import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "../styles/SideMenu.module.scss"
import { Context } from "../Context/Context"

function Menu() {
  const { access } = useContext(Context)
  return (
    <nav className={styles.Menu}>
      <label className={styles["menu-button"]}>
        <input type="checkbox" />
      </label>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
          <Link to="/About">About us</Link>
        </li>
        <li>
          <Link to="/Inquiries">Inquiries</Link>
        </li>

        {access.isAdmin && (
          <li>
            <Link to="/Admin">ADMIN</Link>
          </li>
        )}
        <li>
          <Link to="/SignIn">Sign In</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
