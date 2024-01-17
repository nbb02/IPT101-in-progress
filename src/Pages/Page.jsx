import React from "react"
import SideMenu from "../components/SideMenu"
import styles from "../PagesStyles/Page.module.scss"

function Page({ element, orderElement }) {
  const pageClassName = orderElement ? styles.withOrderTab : styles.Page

  return (
    <div className={pageClassName}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <label className={styles.HamburgerMenu}>
        <input type="checkbox" />
      </label>
      <div className={styles.PageContent}>{element}</div>
      {orderElement && <div className={styles.OrderTab}>{orderElement}</div>}
    </div>
  )
}

export default Page
