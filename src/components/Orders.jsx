import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Orders.module.scss"
import { Link } from "react-router-dom"
import { Context } from "../Context/Context"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../Context/Firebase"

function Orders() {
  const { cart = [], setCart, checkOut, userDetails = {} } = useContext(Context)

  const [deliveryInfo = {}, setDeliveryInfo] = useState()

  const { fullName, phoneNumber, location, street, isHome, otherInfo } =
    deliveryInfo

  const [isOpen, setIsOpen] = useState(false)

  const [paymentMethods, setPaymentMethods] = useState([
    "Cash on Delivery",
    "Gcash",
    "Paymaya",
  ])
  const [selectedMethod, setSelectedMethod] = useState("Cash on Delivery")

  const isEmpty = cart.length === 0
  const subTotal = 0
  const deliveryFee = !isEmpty ? 50 : 0
  const totalPrice = !isEmpty ? subTotal + deliveryFee : 0

  function check() {
    const date = new Date()
    const newDeliveryDetails = {
      deliveryInfo,
      status: "To Process",
      orderDate: date.toLocaleString(),
      subTotal,
      deliveryFee,
      totalPrice,
    }
    checkOut({ ...newDeliveryDetails, cart })
  }

  useEffect(() => {
    if (!!userDetails) setDeliveryInfo(userDetails?.Address?.[0])
  }, [userDetails])

  async function changeQuantity(food, operation) {
    if (operation === "increase") {
      const updatedCart = cart.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      await setDoc(doc(db, "cartDetails", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    } else {
      const updatedCart = cart
        .map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
      await setDoc(doc(db, "cartDetails", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    }
  }

  return (
    <div className={styles.Orders}>
      <div className={styles.OrdersBanner}>
        <h2>My Orders</h2>
      </div>
      <div className={styles.details}>
        <p>Delivery Details</p>
        <div>
          <p>{fullName + " | " + phoneNumber}</p>
          <p>
            {Object.values({ location, street, isHome, otherInfo }).join(" ")}
          </p>
          <label
            className={styles.changeButton}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
          >
            Change Address
          </label>
          <div
            className={styles.changeAddress}
            style={isOpen ? { display: "flex" } : {}}
          >
            <p>Change Address</p>
            {userDetails?.Address &&
              userDetails.Address.map((address) => {
                const {
                  id,
                  fullName,
                  phoneNumber,
                  location,
                  street,
                  isHome,
                  otherInfo,
                } = address
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setDeliveryInfo(address)
                      setIsOpen(false)
                    }}
                    style={
                      address === deliveryInfo ? { borderColor: "aqua" } : {}
                    }
                  >
                    <p>{fullName}</p>
                    <p>{phoneNumber}</p>
                    <p>{location}</p>
                    <p>{street}</p>
                    <p>{isHome}</p>
                    <p>{otherInfo}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {cart.length > 0 ? (
        <div className={styles.MyOrders}>
          {cart.map((order, index) => (
            <div key={index} className={styles.menuCards}>
              <img src={order.img} alt="" />
              <p>{order.name.toUpperCase()}</p>
              <p>{order.time}</p>
              <p>₱ {order.price}</p>
              {order.sauce && <p className={styles.sauce}>{order.sauce}</p>}
              <div className={styles.quantity}>
                <button onClick={() => changeQuantity(order)}>-</button>
                <p>{order.quantity}</p>
                <button onClick={() => changeQuantity(order, "increase")}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noOrders}>
          <h2>No Orders Yet</h2>
          <Link to="/">Order now</Link>
        </div>
      )}
      <footer>
        <p>Sub Total : ₱ {subTotal}</p>
        <p>Delivery Fee : ₱ {deliveryFee}</p>
        <p>Total : ₱ {totalPrice}</p>
        <label>Payment Method :</label>
        <select name="" id="">
          {paymentMethods.map((paymentMethod, index) => (
            <option key={index}>{paymentMethod}</option>
          ))}
        </select>
        <button
          disabled={isEmpty}
          onClick={() => {
            setCart([])
            check()
          }}
        >
          Checkout
        </button>
      </footer>
      <div className={styles.payment}></div>
    </div>
  )
}

export default Orders
