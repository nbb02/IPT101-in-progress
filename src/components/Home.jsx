import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import { Context } from "../Context/Context"
import { db } from "../Context/Firebase"
import { doc, setDoc } from "firebase/firestore"

function Home() {
  const { orderMenu, sauce, setSauce, auth, cart = [] } = useContext(Context)

  async function addToCart(food) {
    const cartItems = [...cart]
    console.log(cartItems)

    const cartIsEmpty = cart.length === 0 ? true : false
    const item = cartIsEmpty ? [] : cart.find((item) => item.id === food.id)
    const itemExist = item ? true : false

    if (cartIsEmpty || !itemExist) {
      const updatedCart = [...cart, { ...food, quantity: 1 }]
      await setDoc(doc(db, "cartDetails", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    } else {
      const updatedCart = cart.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      await setDoc(doc(db, "cartDetails", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    }
  }

  return (
    <div className={styles.MenuOrder}>
      <div className={styles.Home}>
        <div className={styles.top}>
          <h2>Citadel's Bistro</h2>
        </div>

        <div className={styles.menu}>
          {orderMenu &&
            orderMenu
              .filter((item) => item.isAvailable !== false)
              .map((food, index) => (
                <div key={index} className={styles.menuCards}>
                  <img src={food.img} alt="" />
                  <p>{food.name.toUpperCase()}</p>
                  <p>{food.time}</p>
                  <p>₱ {food.price}</p>

                  {food.sauce && (
                    <div className={styles.sauce}>
                      {food.sauce.map((item, index) => (
                        <span
                          key={index}
                          className={
                            sauce.some(
                              (sc) => sc.id === food.id && sc.sauce === item
                            )
                              ? styles.selectedSauce
                              : ""
                          }
                          onClick={() =>
                            setSauce((prevState) =>
                              prevState.map((sitem) =>
                                sitem.id === food.id
                                  ? { ...sitem, sauce: item }
                                  : sitem
                              )
                            )
                          }
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  <button onClick={() => addToCart(food)}>
                    <i className="ri-shopping-cart-2-line"></i>
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Home
