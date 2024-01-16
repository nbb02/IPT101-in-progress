import React, { useEffect, useState } from "react"
import styles from "../PagesStyles/AdminTransactions.module.scss"
import { db } from "../Context/Firebase"
import { collection, onSnapshot } from "firebase/firestore"

function AdminTransactions() {
  const [transactions, setTransactions] = useState([])

  const [filteredTransactions, setFilteredTransactions] = useState([])

  function filterTransactions() {
    const toPay = []
    const processing = []
    const commpleted = []
    const cancelled = []
    const unknown = []

    transactions?.map((users) => {
      users?.transactions?.map((transaction) => {
        switch (transaction.status) {
          case "to Pay":
            toPay.push(transaction)
          case "processing":
            processing.push(transaction)
          case "completed":
            commpleted.push(transaction)
          case "cancelled":
            cancelled.push(transaction)
          default:
            unknown.push(transaction)
        }
      })
    })
    setFilteredTransactions({
      toPay,
      processing,
      commpleted,
      cancelled,
      unknown,
    })
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
        <div>
          <h2>To Pay</h2>
          <div></div>
        </div>
        <div>
          <h2>Processing</h2>
          <div></div>
        </div>
        <div>
          <h2>Completed</h2>
          <div></div>
        </div>
        <div>
          <h2>Cancelled</h2>
          <div></div>
        </div>
        <div>
          <h2>Unknown</h2>
          <div>
            {filteredTransactions &&
              filteredTransactions?.unknown?.map((item, index) => {
                const { status, orderDate } = item
                return (
                  <div key={index}>
                    <p>{status}</p>
                    <p>{orderDate}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTransactions
