import React, { createContext, useEffect, useState } from "react"
import { auth, db } from "./Firebase"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const Context = createContext()

function ContextProvider({ children }) {
  const [access, setAccess] = useState(false)

  const [userDetails, setUserDetails] = useState({})

  const [orderMenu, setOrderMenu] = useState([])

  async function getOrderMenu() {
    const docSnap = await getDoc(doc(db, "orderMenu", "orderMenuItems"))
    if (docSnap.exists()) {
      setOrderMenu(docSnap?.data()?.orderMenuItems)
    }
  }

  //FOR CART
  const [cart, setCart] = useState([])

  async function getCartItems() {
    const docRef = doc(db, "cartItems", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setCart(docSnap.data().cartItems)
    }
  }

  //USER DETAILS
  async function getUserDetails() {
    const docRef = doc(db, "userDetails", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUserDetails(docSnap.data())
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDetails()
        getCartItems()
        setAccess(true)
      } else {
        setUserDetails(() => {})
        setAccess(() => false)
      }
    })

    const notAvailable = orderMenu
      .filter((item) => item.isAvailable === false)
      .map((item) => item.id)

    setCart((prevState) =>
      prevState.filter((item) => !notAvailable.includes(item.id))
    )

    async function checkAccess() {
      if (!!auth.currentUser) {
        const docRef = doc(db, "userDetails", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        setAccess(docSnap.exists() && docSnap.data().phoneNumber ? true : false)
      }
    }

    checkAccess()
    getOrderMenu()
  }, [])

  useEffect(() => {
    const userDetailsShot = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "userDetails", auth.currentUser.uid), (doc) => {
            setUserDetails(doc?.data())
          })
        }
      })
    }

    const menuSnapshot = () => {
      onSnapshot(doc(db, "orderMenu", "orderMenuItems"), (doc) => {
        setOrderMenu(doc?.data()?.orderMenuItems)
      })
    }

    const cartItemsSnapshot = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "cartItems", auth.currentUser.uid), (doc) => {
            setCart(doc?.data()?.cartItems)
          })
        }
      })
    }

    return () => {
      userDetailsShot()
      menuSnapshot()
      cartItemsSnapshot()
    }
  }, [])

  return (
    <Context.Provider
      value={{
        orderMenu,
        cart,
        auth,
        db,
        access,
        userDetails,
        getUserDetails,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }
