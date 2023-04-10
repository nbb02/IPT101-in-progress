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

  const notEmpty = cart.length !== 0
  const isEmpty = cart.length === 0
  const total = !isEmpty ? cart.map((obj) => obj.quantity * obj.price) : 0
  const totalPrice = !isEmpty
    ? total.reduce((total, value) => total + value)
    : 0

  function check() {
    const date = new Date()
    const newDeliveryDetails = {
      deliveryInfo,
      status: "Processing",
      orderDate: date.toLocaleString(),
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
          <Link to="/Home">Order now</Link>
        </div>
      ) : (
        <div className={styles.MyOrders}>
          {cart.map((order) => (
            <div key={order.name} className={styles.menuCards}>
              <img src={order.img} alt="" />
              <p>{order.name.toUpperCase()}</p>
              <p>{order.time}</p>
              <p>₱ {order.price}</p>
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
        <p>Sub Total</p>
        <p>Delivery Fee</p>
        <p>Total: {totalPrice}</p>
        <button
          disabled={!notEmpty}
          onClick={() => {
            setCart([])
            check()
          }}
        >
          Checkout
        </button>
      </footer>
    </div>
  )
}

export default Orders
