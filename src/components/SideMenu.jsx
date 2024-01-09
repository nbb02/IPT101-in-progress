import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "../styles/SideMenu.module.scss"
import { Context } from "../Context/Context"

function Menu() {
  const { cookies, signOut } = useContext(Context)
  const { user } = cookies

  return (
    <nav>
      <label className={styles["menu-button"]}>
        <input type="checkbox" />
      </label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <>
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
              <Link to="/Inquiries">Inquiries</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/About">About us</Link>
        </li>
        {cookies?.user?.isAdmin && (
          <li>
            <Link to="/Admin">ADMIN</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/SignIn">Sign In</Link>
          </li>
        )}
      </ul>
      {user && <button onClick={signOut}>Sign Out</button>}
    </nav>
  )
}

export default Menu
