import React, { useState } from "react"
import SideMenu from "../components/SideMenu"
import styles from "../PagesStyles/Page.module.scss"

function Page({ element }) {
  return (
    <div className={styles.Page}>
      <div className={styles.SideMenuTab}>
        <SideMenu />
      </div>
      <label className={styles.HamburgerMenu}>
        <input type="checkbox" />
      </label>
      <div className={styles.PageContent}>{element}</div>
    </div>
  )
}

export default Page
