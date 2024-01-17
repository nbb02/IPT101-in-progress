import React, { useEffect, useState } from "react"
import styles from "../PagesStyles/AdminTransactions.module.scss"
import { db } from "../Context/Firebase"
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"

function AdminTransactions() {
  const [transactions, setTransactions] = useState([])

  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [transactionData, setTransactionData] = useState()
  const [eachTransaction, setEachTransaction] = useState()

  function filterTransactions() {
    const toPay = []
    const processing = []
    const completed = []
    const cancelled = []
    const unknown = []

    transactions?.forEach((users) => {
      users?.transactions?.map((transaction) => {
        const { status } = transaction
        if (status == +"To Pay") toPay.push(transaction)
        else if (status === "Processing") processing.push(transaction)
        else if (status === "Completed") completed.push(transaction)
        else if (status === "Cancelled") cancelled.push(transaction)
        else unknown.push(transaction)
      })
    })
    console.log(processing)
    console.log(unknown)
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
    return (
      <div onClick={() => setEachTransaction(data)}>
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

  function FoodComponents({ data }) {
    const { id, img, name, price, quantity } = data
    return (
      <div>
        <p>{name}</p>
        {img && <img src={img} />}
        <p>{price}</p>
        <p>{quantity}</p>
      </div>
    )
  }

  async function changeOrderStatus(userId, transactionId, statusToSet) {
    const docRef = doc(db, "transactions", userId)
    const docSnap = await getDoc(docRef)

    const statusData = []

    if (docSnap.exists()) {
      statusData.push(docSnap.data())

      const updatedStatus = statusData.map((item) => {
        return item.id === transactionId
          ? { ...item, status: statusToSet }
          : item
      })
      await updateDoc(docRef, { transactions: updatedStatus })
      filterTransactions()
      setEachTransaction(
        filteredTransactions.find((item) => item.id === transactionId)
      )
    }
  }

  function EachTransactionComponent({ data }) {
    const {
      deliveryInfo,
      cart,
      deliveryFee,
      orderDate,
      status,
      subTotal,
      id,
      totalPrice,
    } = data
    const { username, address, uid } = deliveryInfo

    let statusToSet

    if (status === "To Pay") statusToSet = "Processing"
    else if (status === "Processing") statusToSet = "Completed"
    else if (status === "Cancelled") statusToSet = "Cancelled"
    else statusToSet = "Unknown"

    return (
      <div className={styles.eachTransactionComponent}>
        <p>{username}</p>
        <p>{address}</p>
        {cart &&
          cart?.map((item) => <FoodComponents data={item} key={item.id} />)}
        <p>{orderDate}</p>
        <p>{status}</p>
        <p>{subTotal}</p>
        <p>{deliveryFee}</p>
        <p>{totalPrice}</p>
        {(status != "Completed" ||
          status != "Cancelled" ||
          status != "Unknown") && (
          <>
            <button onClick={() => changeOrderStatus(uid, id, statusToSet)}>
              {statusToSet}?
            </button>
            <button onClick={() => changeOrderStatus(uid, id, "Cancelled")}>
              Cancel?
            </button>
          </>
        )}
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
              <TransactionSubComponent data={item} key={Date.now()} />
            ))
          ) : (
            <h1>No Transactions</h1>
          )}
        </div>
      )}
      {eachTransaction && (
        <div>
          <button onClick={() => setEachTransaction()}>Close</button>
          {eachTransaction ? (
            <EachTransactionComponent data={eachTransaction} />
          ) : (
            <h1>Error</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminTransactions
