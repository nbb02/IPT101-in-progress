import React, { useEffect, useState } from "react"
import styles from "../PagesStyles/AdminTransactions.module.scss"
import { db } from "../Context/Firebase"
import { collection, onSnapshot } from "firebase/firestore"

function AdminTransactions() {
  const [transactions, setTransactions] = useState([])

  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [transactionData, setTransactionData] = useState()

  function filterTransactions() {
    const toPay = []
    const processing = []
    const completed = []
    const cancelled = []
    const unknown = []

    transactions?.forEach((users) => {
      users?.transactions?.map((transaction) => {
        const { status } = transaction
        if (status === "To Pay") toPay.push(transaction)
        else if (status === "Processing") processing.push(transaction)
        else if (status === "Completed") completed.push(transaction)
        else if (status === "Cancelled") cancelled.push(transaction)
        else unknown.push(transaction)
      })
    })
    setFilteredTransactions({
      toPay,
      processing,
      completed,
      cancelled,
      unknown,
    })
  }

  function TransactionSubComponent({ data }) {
    const { status, date, cart, totalPrice } = data
    console.log(data)
    return (
      <div>
        <p>Status : {status}</p>
        <p>Order Date : {date}</p>
        <div>
          <img src={cart[0].img} alt="" height={50} />
          <p>{cart[0].name}</p>
          <p>{cart[0].quantity}</p>
          <p>{cart[0].price}</p>
        </div>
        <p>
          {cart.length} {cart.length > 1 ? "items" : "item"}
        </p>
        <p>{totalPrice}</p>
      </div>
    )
  }

  useEffect(() => {
    filterTransactions()
  }, [transactions])

  useEffect(() => {
    const onTransactionsSnapshot = () => {
      onSnapshot(collection(db, "transactions"), (snapshot) => {
        const transactionData = []
        snapshot.forEach((doc) => {
          transactionData.push(doc.data())
        })
        setTransactions(transactionData)
      })
    }
    return onTransactionsSnapshot()
  }, [])

  return (
    <div>
      <div className="banner">
        <h1>Transactions</h1>
        <h6>ADMIN</h6>
      </div>
      <div>
        <button onClick={() => setTransactionData(filteredTransactions.toPay)}>
          To Pay
        </button>
        <button
          onClick={() => setTransactionData(filteredTransactions.processing)}
        >
          Processing
        </button>
        <button
          onClick={() => setTransactionData(filteredTransactions.completed)}
        >
          Completed
        </button>
        <button
          onClick={() => setTransactionData(filteredTransactions.cancelled)}
        >
          Cancelled
        </button>
        <button
          onClick={() => setTransactionData(filteredTransactions.unknown)}
        >
          Unknown
        </button>
      </div>
      {transactionData && (
        <div>
          <button onClick={() => setTransactionData()}>Close</button>
          {transactionData.length !== 0 ? (
            transactionData.map((item) => (
              <TransactionSubComponent data={item} />
            ))
          ) : (
            <h1>No Transactions</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminTransactions
