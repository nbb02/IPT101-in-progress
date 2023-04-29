import React, { useContext } from "react"
import SideMenu from "../components/SideMenu"
import styles from "../PagesStyles/Page.module.scss"
import { Context } from "../Context/Context"

function Page({ element, orderElement }) {
  const pageClassName = orderElement ? styles.withOrderTab : styles.Page

  const { cart } = useContext(Context)
  // const withOrderStyle =
  //   cart.length > 0
  //     ? { gridTemplateColumns: "auto" }
  //     : { gridTemplateColumns: "1fr 5fr" }
  // const orderTabStyle = cart.length > 0 ? {} : { display: "none" }

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
