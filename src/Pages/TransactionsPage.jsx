import React, { useContext } from "react"
import { Context } from "../Context/Context"
import styles from "../PagesStyles/TransactionsPage.module.scss"
import SideMenu from "../components/SideMenu"
import { useNavigate } from "react-router-dom"

function TransactionsPage() {
  const { transactions } = useContext(Context)

  console.log(transactions)
  const navigate = useNavigate()

  return (
    <div className={styles.TransactionsPage}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <div className={styles.TransactionsTab}>
        <label className={styles["menu-button-home"]}>
          <input type="checkbox" />
        </label>
        <div className={styles.TransactionsBanner}>
          <h1>Transactions</h1>
        </div>
        <div className={styles.TransactionsContainer}>
          {transactions.map((item) => {
            const { img, name, price, quantity } = item.cart[0]
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
                  Total Price: {item.totalPrice}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
