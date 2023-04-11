import React, { useContext } from "react"
import { Context } from "../Context/Context"
import { Link, useParams } from "react-router-dom"
import styles from "../styles/Transaction.module.scss"

function Transaction() {
  const { transactions } = useContext(Context)
  const { transactionId } = useParams()
  const data = transactions.find((obj) => obj.id === parseInt(transactionId))
  const {
    cart,
    deliveryInfo,
    status,
    totalPrice,
    orderDate,
    subTotal,
    deliveryFee,
  } = data || {}
  const { fullName, phoneNumber, location, street, isHome, otherInfo } =
    deliveryInfo || {}

  if (!data) {
    return (
      <h1>
        Not Found <Link to="Home">Home</Link>
      </h1>
    )
  }

  return (
    <div className={styles.TransactionPage}>
      <div className={styles.TransactionBanner}>
        <h1>Transaction</h1>
      </div>
      <div className={styles.TransactionContainer}>
        <p>
          Address :
          {Object.values({ location, street, isHome, otherInfo }).join(" ")}
        </p>
        <p>Recipient: {fullName + " | " + phoneNumber}</p>
        <p>Status : {status}</p>
        <p>Order Date : {orderDate}</p>
        <p>Sub Total: ₱ {subTotal}</p>
        <p>Delivery Fee: ₱ {deliveryFee}</p>
        <p>Order Total: ₱ {totalPrice}</p>
        <div className={styles.orders}>
          <div className={styles.MyOrders}>
            {cart &&
              cart.map((order) => (
                <div key={order.name}>
                  {order.img && <img src={order.img} alt="" />}
                  <div className={styles.details}>
                    <p>{order.name.toUpperCase()}</p>
                    <p>{order.time}</p>
                    <p>x {order.quantity}</p>
                    <p>₱ {order.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
