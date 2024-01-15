import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "../styles/Transaction.module.scss"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../Context/Firebase"

function Transaction() {
  const { transactionId } = useParams()

  const [transaction = {}, setTransaction] = useState()

  async function getTransactions() {
    const docRef = doc(db, "transactions", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setTransaction(
        docSnap?.data()?.transactions?.find((item) => item.id == transactionId)
      )
    }
  }

  useEffect(() => {
    getTransactions()
    console.log(transaction)
  }, [])

  const {
    cart,
    deliveryInfo = {},
    status,
    totalPrice,
    orderDate,
    subTotal,
    deliveryFee,
  } = transaction
  const { fullName, phoneNumber, location, street, isHome, otherInfo } =
    deliveryInfo

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
              cart.map((order, index) => (
                <div key={index} className={styles.menuCards}>
                  {order.img && <img src={order.img} alt="" />}
                  <p>{order.name.toUpperCase()}</p>
                  <p>{order.time}</p>
                  <p>x {order.quantity}</p>
                  {order.sauce && <p className={styles.sauce}>{order.sauce}</p>}
                  <p>₱ {order.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
