import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import { Context } from "../Context/Context"
import { db } from "../Context/Firebase"
import { doc, setDoc } from "firebase/firestore"

function Home() {
  const { orderMenu = [], auth, cart = [] } = useContext(Context)

  const [sauce, setSauce] = useState([])

  async function addToCart(food) {
    const cartIsEmpty = cart.length === 0 ? true : false
    const foodItem = cartIsEmpty ? [] : cart.find((item) => item.id === food.id)
    let itemExist = foodItem ? true : false

    let updatedFood = food

    const itemHasSauce = food.sauce
    if (itemHasSauce) {
      const selectedSauce = sauce.find(
        (item) => item.id === updatedFood.id
      ).sauce
      updatedFood = { ...food, sauce: selectedSauce }
      const hasSameSauce = cart.find(
        (item) => item.id === food.id && item.sauce === selectedSauce
      )
      itemExist = itemExist && hasSameSauce
    }

    if (cartIsEmpty || !itemExist) {
      const updatedCart = [...cart, { ...updatedFood, quantity: 1 }]
      await setDoc(doc(db, "cartItems", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    } else {
      const updatedCart = cart.map((item) =>
        item.id === updatedFood.id && item.sauce === updatedFood.sauce
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      await setDoc(doc(db, "cartItems", auth.currentUser.uid), {
        cartItems: updatedCart,
      })
    }
  }

  useEffect(() => {
    if (orderMenu.length !== 0) {
      const preferredSauce = orderMenu
        .filter((item) => item.sauce)
        .map((item) => ({ id: item.id, sauce: item.sauce[0] }))

      setSauce(preferredSauce)
    }
  }, [orderMenu])

  return (
    <div className={styles.MenuOrder}>
      <div className={styles.Home}>
        <div className={styles.top}>
          <h2>Citadel's Bistro</h2>
        </div>

        <div className={styles.menu}>
          {orderMenu.length !== 0 &&
            orderMenu
              .filter((item) => item.isAvailable !== false)
              .map((food, index) => (
                <div key={index} className={styles.menuCards}>
                  <img src={food.img} alt="" />
                  <p>{food.name.toUpperCase()}</p>
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
