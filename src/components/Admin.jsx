import React, { useContext } from "react"
import styles from "../styles/Admin.module.scss"
import { Context } from "../Context/Context"
import Transactions from "../components/Transactions"

function Admin() {
  const { transactions } = useContext(Context)
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBanner}>
        <h1>ADMIN</h1>
      </div>
      <div>
        <Transactions />
      </div>
    </div>
  )
}

export default Admin
