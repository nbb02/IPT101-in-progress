import React, { useContext } from "react"
import { Context } from "../Context/Context"
import { useParams } from "react-router-dom"
import styles from "../PagesStyles/TransactionPage.module.scss"
import SideMenu from "../components/SideMenu"

function TransactionPage() {
  const { transactions } = useContext(Context)
  const { transactionId } = useParams()
  const data = transactions.find((obj) => obj.id === parseInt(transactionId))
  const { cart, deliveryInfo, status, totalPrice, orderDate } = data
  const { fullName, phoneNumber, location, street, isHome, otherInfo } =
    deliveryInfo

  return (
    <div className={styles.TransactionPage}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <div className={styles.TransactionTab}>
        <label className={styles["menu-button-home"]}>
          <input type="checkbox" />
        </label>
        <div className={styles.TransactionContainer}>
          <p>
            Address:
            {Object.values({ location, street, isHome, otherInfo }).join(" ")}
          </p>
          <p>Recipient: {fullName + " | " + phoneNumber}</p>
          <p>Status : {status}</p>
          <p>Order Date : {orderDate}</p>
          <p>Order Total: {totalPrice}</p>
          <div className={styles.orders}>
            <div className={styles.MyOrders}>
              {cart.map((order) => (
                <div key={order.name}>
                  <div className={styles.image}>
                    {order.img && <img src={order.img} alt="" />}
                  </div>
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
    </div>
  )
}

export default TransactionPage
