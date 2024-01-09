import React, { useContext, useState } from "react"
import styles from "../styles/Orders.module.scss"
import { Link } from "react-router-dom"
import { Context } from "../Context/Context"

function Orders() {
  const { cart, setCart, changeQuantity, checkOut, myAddresses } =
    useContext(Context)

  const [deliveryInfo, setDeliveryInfo] = useState(myAddresses[0])
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
  const subTotal = !isEmpty
    ? cart
        .map((obj) => obj.quantity * obj.price)
        .reduce((total, value) => total + value)
    : 0
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

  function changeDeliveryInfo(info) {
    setDeliveryInfo(info)
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
            {myAddresses &&
              myAddresses.map((address) => {
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
                      changeDeliveryInfo(address)
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
      {cart.length === 0 ? (
        <div className={styles.noOrders}>
          <h2>No Orders Yet</h2>
          <Link to="/">Order now</Link>
        </div>
      ) : (
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
