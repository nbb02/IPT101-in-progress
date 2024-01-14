import React, { createContext, useEffect, useState } from "react"
import { auth, db } from "./Firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const Context = createContext()

function ContextProvider({ children }) {
  const [access, setAccess] = useState(false)

  const [userDetails, setUserDetails] = useState({})

  const [orderMenu, setOrderMenu] = useState([])

  function editOrderMenu(orderMenudata) {
    setOrderMenu(orderMenudata)
  }

  async function getOrderMenu() {
    const querySnapshot = await getDocs(collection(db, "orderMenu"))
    const orderMenuData = []
    querySnapshot.forEach((doc) => {
      orderMenuData.push(doc.data())
    })
    setOrderMenu(orderMenuData)
  }

  //FOR CART
  const [cart, setCart] = useState([])

  async function getCartItems() {
    const docRef = doc(db, "cartDetails", auth.currentUser.uid)
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

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      deliveryInfo: userDetails?.uid?.Address[0],
      cart: [
        {
          id: 1,
          name: "tosilog",
          time: "Breakfast",
          img: "https://i.ibb.co/1QmFFLJ/tosilog.jpg",
          price: 100,
          quantity: 1,
        },
        {
          id: 2,
          name: "hotsilog",
          time: "Breakfast",
          img: "https://i.ibb.co/R9ZRX8h/hotsilog.jpg",
          price: 100,
          quantity: 1,
        },
      ],
      orderDate: "4/10/2023",
      status: "Processing",
      subTotal: "200",
      deliveryFee: "50",
      totalPrice: "250",
    },
  ])

  function checkOut(data) {
    setTransactions([
      ...transactions,
      { id: (transactions.length || 0) + 1, ...data },
    ])
  }

  function cancelOrder(id) {
    setTransactions((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
      )
    )
  }

  function orderCompleted(id) {
    setTransactions((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Completed",
            }
          : item
      )
    )
  }

  //FOR INQUIRIES
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      userName: "Nberres",
      comment: "Where are you located?",
      replies: [
        { id: 1, userName: "Citadel's Bistro", reply: "At San Ildefonso" },
      ],
    },
    {
      id: 2,
      userName: "Nberres",
      comment: "What is the best seller",
      replies: [
        { id: 1, userName: "Citadel's Bistro", reply: "Tocilog" },
        { id: 2, userName: "Citadel's Bistro", reply: "Goto" },
      ],
    },
  ])

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
          onSnapshot(doc(db, "userDetails", auth.currentUser.uid), () => {
            getUserDetails()
          })
        }
      })
    }

    const menuSnapshot = () => {
      onSnapshot(collection(db, "orderMenu"), () => {
        getOrderMenu()
      })
    }

    const cartDetailsSnapshot = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "cartDetails", auth.currentUser.uid), (doc) => {
            setCart(doc.data().cartItems)
          })
        }
      })
    }

    return () => {
      userDetailsShot()
      menuSnapshot()
      cartDetailsSnapshot()
    }
  }, [])

  return (
    <Context.Provider
      value={{
        orderMenu,
        setOrderMenu,
        editOrderMenu,
        cart,
        setCart,
        checkOut,
        transactions,
        cancelOrder,
        orderCompleted,
        inquiries,
        setInquiries,
        auth,
        db,
        access,
        userDetails,
        getOrderMenu,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }
