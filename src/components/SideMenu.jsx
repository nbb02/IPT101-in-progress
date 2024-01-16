import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/SideMenu.module.scss"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../Context/Firebase"
import { Context } from "../Context/Context"

function Menu() {
  const navigate = useNavigate()
  const auth = getAuth()
  const { access, userDetails } = useContext(Context)
  const [SignedIn, setSignedIn] = useState(false)
  const [hasPhone, setHasPhone] = useState(false)

  async function handleSignOut() {
    await signOut(auth)
    navigate("/")
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
        {hasPhone && access && (
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
        {/* fix this after */}
        {userDetails?.Admin ||
          (true && (
            <>
              <li>
                <Link to="/Admin">ADMIN</Link>
              </li>
              <li>
                <Link to="/AdminInquiries">Inquries</Link>
              </li>
            </>
          ))}
        {(!hasPhone || !access) && (
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
