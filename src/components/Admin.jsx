import React, { useContext } from "react"
import styles from "../styles/Admin.module.scss"
import { Context } from "../Context/Context"
import MenuEditor from "./MenuEditor"
import { useNavigate } from "react-router-dom"

function Admin() {
  const navigate = useNavigate()
  const { transactions, orderCompleted, cancelOrder, access } =
    useContext(Context)

  if (!access.isAdmin) navigate("/")

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBanner}>
        <h1>ADMIN</h1>
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
                  {item.status === "To Process" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        cancelOrder(item.id)
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                  {item.status === "Processing" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        orderCompleted(item.id)
                      }}
                    >
                      Order Completed
                    </button>
                  )}
                </div>
              )
            })}
      </div>
      <MenuEditor />
    </div>
  )
}

export default Admin
