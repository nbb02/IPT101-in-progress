import React from "react"
import SideMenu from "../components/SideMenu"
import Orders from "../components/Orders"
import styles from "../PagesStyles/OrdersPage.module.scss"

function OrdersPage() {
  return (
    <div className={styles.OrdersPage}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <div className={styles.OrdersTab}>
        <label className={styles["menu-button-home"]}>
          <input type="checkbox" />
        </label>
        <Orders />
      </div>
    </div>
  )
}

export default OrdersPage
