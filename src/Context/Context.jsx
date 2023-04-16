import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const Context = createContext()

function ContextProvider({ children }) {
  const [orderMenu, setOrderMenu] = useState([
    {
      id: 1,
      name: "Tocilog",
      time: "Breakfast",
      img: "https://i.ibb.co/1QmFFLJ/tosilog.jpg",
      price: 60,
    },
    {
      id: 2,
      name: "Hotsilog",
      time: "Breakfast",
      img: "https://i.ibb.co/R9ZRX8h/hotsilog.jpg",
      price: 50,
    },
    {
      id: 3,
      name: "Tapsilog",
      time: "Breakfast",
      img: "https://i.ibb.co/gJKqhLh/tapsilog.jpg",
      price: 70,
    },
    {
      id: 4,
      name: "Goto",
      time: "Breakfast",
      img: "https://i.ibb.co/jMd2crK/goto.jpg",
      price: 70,
    },
    {
      id: 5,
      name: "Fisball",
      time: "Snacks",
      img: "https://i.ibb.co/XZ4Sjqz/fishball.jpg",
      price: 10,
    },
    {
      id: 6,
      name: "Kikiam",
      time: "Snacks",
      img: "https://i.ibb.co/LP7jQq1/kikiam.jpg",
      price: 10,
    },
    {
      id: 7,
      name: "Fries",
      time: "Snacks",
      img: "https://i.ibb.co/bbyjKvD/fries.jpg",
      price: 10,
    },
  ])

  function editOrderMenu(orderMenudata) {
    setOrderMenu(orderMenudata)
  }
  console.log(orderMenu)

  //FOR LOGIN
  const [access, setAccess] = useState(false)
  const [users, setUsers] = useState([
    {
      user: "admin",
      pass: "admin",
    },
  ])
  function signIn(signInData) {
    const { user, pass } = signInData

    let access = users.find((obj) => obj.user === user && obj.pass === pass)
    if (access) {
      setAccess(true)
    }
    return access
  }
  function signUp(signUpData) {
    setUsers((prevState) => [...prevState, { ...signUpData }])
    console.log(users)
  }

  //FOR CART
  const [cart, setCart] = useState([
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
  ])

  const [myAddresses, setMyAddresses] = useState([
    {
      id: 1,
      fullName: "Nathaniel B. Berres",
      phoneNumber: "091212321",
      location: "Barangca, Baliwag, Bulacan",
      street: "Wenceslao Ortega 123",
      isHome: "Home",
      otherInfo: "",
    },
    {
      id: 2,
      fullName: "dasdasdsa",
      phoneNumber: "09121asdasd2321",
      location: "Baranasdgca, Baliwag, Bulacan",
      street: "Wencsaeslao Ortega 1dassad23",
      isHome: "Hoasdasme",
      otherInfo: "aasdsa",
    },
  ])

  function deleteAddress(id) {
    setMyAddresses((prevState) =>
      prevState.filter((address) => address.id !== id)
    )
  }

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      deliveryInfo: myAddresses[0],
      cart,
      orderDate: "4/10/2023",
      status: "Processing",
      subTotal: "200",
      deliveryFee: "50",
      totalPrice: "250",
    },
  ])

  function handleAddressSubmit(newAddress) {
    setMyAddresses((prevState) => [
      ...prevState,
      { id: prevState.length + 1, ...newAddress },
    ])
  }

  function addToCart(food) {
    cart.find((obj) => obj.name === food.name)
      ? setCart((prevState) =>
          prevState.map((obj) => {
            return obj.name === food.name
              ? { ...obj, quantity: obj.quantity + 1 }
              : obj
          })
        )
      : setCart((prevState) => [...prevState, { ...food, quantity: 1 }])
  }

  function changeQuantity(food, operation) {
    if (operation === "increase") {
      setCart((prevState) =>
        prevState.map((obj) =>
          obj.name === food.name ? { ...obj, quantity: obj.quantity + 1 } : obj
        )
      )
    } else {
      setCart((prevState) =>
        prevState
          .map((obj) =>
            obj.name === food.name
              ? { ...obj, quantity: obj.quantity - 1 }
              : obj
          )
          .filter((obj) => obj.quantity > 0)
      )
    }
  }

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

  return (
    <Context.Provider
      value={{
        orderMenu,
        editOrderMenu,
        cart,
        setCart,
        addToCart,
        changeQuantity,
        checkOut,
        transactions,
        signIn,
        users,
        access,
        myAddresses,
        handleAddressSubmit,
        deleteAddress,
        cancelOrder,
        signUp,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }
