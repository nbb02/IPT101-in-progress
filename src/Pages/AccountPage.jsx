import React, { useContext } from "react"
import styles from "../PagesStyles/AccountPage.module.scss"
import SideMenu from "../components/SideMenu"
import Account from "../components/Account"

function AccountPage() {
  return (
    <div className={styles.AccountPage}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <div className={styles.AccountTab}>
        <div className={styles.TransactionTab}>
          <label className={styles["menu-button-home"]}>
            <input type="checkbox" />
          </label>
        </div>
        <div className={styles.AccountTab}>
          <Account />
        </div>
      </div>
    </div>
  )
}

export default AccountPage
