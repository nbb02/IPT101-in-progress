import React, { useContext, useState } from "react"
import styles from "../styles/Home.module.scss"
import { Context } from "../Context/Context"

function Home() {
  const { orderMenu, addToCart } = useContext(Context)

  const [orderList, setOrderList] = useState(orderMenu)

  function filter(timeOfDay) {
    setOrderList(orderMenu.filter((item) => item.time === timeOfDay))
  }

  return (
    <div className={styles.MenuOrder}>
      <div className={styles.Home}>
        <div className={styles.top}>
          <h2>Citadel's Bistro</h2>
        </div>
        <div className={styles.filter}>
          <button onClick={() => setOrderList(orderMenu)}>All</button>
          <button onClick={() => filter("Breakfast")}>Breakfast</button>
          <button onClick={() => filter("Lunch")}>Lunch</button>
          <button onClick={() => filter("Dinner")}>Dinner</button>
          <button onClick={() => filter("Snacks")}>Snacks</button>
        </div>
        <div className={styles.menu}>
          {orderList &&
            orderList.map((food) => (
              <div key={food.id} className={styles.menuCards}>
                <img src={food.img} alt="" />
                <p>{food.name.toUpperCase()}</p>
                <p>{food.time}</p>
                <p>₱ {food.price}</p>
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
