import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context/Context"
import styles from "../styles/Transactions.module.scss"
import { useNavigate } from "react-router-dom"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../Context/Firebase"
import { onAuthStateChanged } from "firebase/auth"

function Transactions() {
  const { cancelOrder, auth } = useContext(Context)
  const [transactions, setTransactions] = useState([])

  const navigate = useNavigate()

  async function getTransactions() {
    const docRef = doc(db, "transactions", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setTransactions(docSnap.data().transactions)
    }
  }

  useEffect(() => {
    const transactionsSnapshot = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "transactions", auth.currentUser.uid), (doc) => {
            setTransactions(doc?.data()?.transactions)
          })
        }
      })
    getTransactions()
    console.log(transactions)

    return transactionsSnapshot()
  }, [])

  return (
    <div className={styles.TransactionsPage}>
      <div className={styles.TransactionsBanner}>
        <h1>Transactions</h1>
      </div>
      <div className={styles.TransactionsContainer}>
        {transactions &&
          transactions
            .sort((itemA, itemB) => (itemA.id > itemB.id ? -1 : 1))
            .map((item) => {
              const { img, name, price, quantity } = item.cart[0] || {}
              return (
                <div
                  className={styles.transaction}
                  key={item.id}
                  onClick={() => navigate(`/Transaction/${item.id}`)}
                >
                  <p>Status: {item.status}</p>
                  <p>Order Date: {item.orderDate.slice(0, 9)}</p>
                  <img src={img} alt="" />
                  <p>{name.toUpperCase()}</p>
                  <p>x {quantity}</p>
                  <p>₱ {price}</p>
                  <p>
                    {item.cart.length > 1
                      ? `${item.cart.length} items `
                      : `1 item `}
                    Total Price: ₱ {item.totalPrice}
                  </p>
                  <button
                    style={
                      item.status === "To Process"
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    onClick={(e) => {
                      e.stopPropagation()
                      cancelOrder(item.id)
                    }}
                  >
                    Cancel Order
                  </button>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Transactions
