import React, { useContext } from "react"
import SideMenu from "../components/SideMenu"
import styles from "../PagesStyles/Page.module.scss"
import { Context } from "../Context/Context"
import { useNavigate } from "react-router-dom"

function Page({ element, orderElement }) {
  const pageClassName = orderElement ? styles.withOrderTab : styles.Page
  const { access } = useContext(Context)
  const navigate = useNavigate()

  if (!access.access) navigate("/signin")

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
