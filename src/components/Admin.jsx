import React, { useContext } from "react"
import styles from "../styles/Admin.module.scss"
import { Context } from "../Context/Context"
import TransactionsPage from "../Pages/TransactionsPage"

function Admin() {
  const { transactions } = useContext(Context)
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBanner}>
        <h1>ADMIN</h1>
      </div>
      <div>
        <TransactionsPage />
      </div>
    </div>
  )
}

export default Admin
