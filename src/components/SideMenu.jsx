import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "../styles/SideMenu.module.scss"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../Context/Firebase"

function Menu() {
  const auth = getAuth()
  const [SignedIn, setSignedIn] = useState(false)
  const [hasPhone, setHasPhone] = useState(false)

  function handleSignOut() {
    signOut(auth)
  }

  function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
      setSignedIn(user ? true : false)
    })
  }

  async function checkPhone() {
    if (!!auth.currentUser) {
      const docRef = doc(db, "userDetails", auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      setHasPhone(docSnap.exists() && docSnap.data().phoneNumber ? true : false)
    }
  }

  useEffect(() => {
    checkAuthState()
    checkPhone()
  }, [hasPhone, SignedIn])

  return (
    <nav>
      <label className={styles["menu-button"]}>
        <input type="checkbox" />
      </label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {hasPhone && (
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
        {/* { && (
          <li>
            <Link to="/Admin">ADMIN</Link>
          </li>
        )} */}
        {!hasPhone && (
          <li>
            <Link to="/SignIn">
              {auth.currentUser && !hasPhone ? "Add Phone Number" : "Sign In"}
            </Link>
          </li>
        )}
      </ul>
      {SignedIn && <button onClick={handleSignOut}>Sign Out</button>}
    </nav>
  )
}

export default Menu
