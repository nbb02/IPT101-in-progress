import React, { useContext, useState } from "react"
import { Context } from "../Context/Context"
import styles from "../styles/MenuEditor.module.scss"

function MenuEditor() {
  const { orderMenu, editOrderMenu } = useContext(Context)

  const [toEdit, setToEdit] = useState({
    name: "",
    time: "",
    price: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setToEdit((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = orderMenu.filter((item) => item.id !== toEdit.id)
    editOrderMenu([toEdit, ...data])
  }

  return (
    <div>
      <h2>Menu Editor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={toEdit.name}
        />
        <input
          type="text"
          name="time"
          onChange={handleChange}
          value={toEdit.time}
        />
        <input
          type="text"
          name="price"
          onChange={handleChange}
          value={toEdit.price}
        />
        <button type="submit">Done Editing</button>
      </form>
      <div className={styles.menu}>
        {orderMenu &&
          orderMenu.map((food) => (
            <div key={food.name} className={styles.menuCards}>
              <img src={food.img} alt="" />
              <p>{food.name.toUpperCase()}</p>
              <p>{food.time}</p>
              <p>₱ {food.price}</p>
              <button onClick={() => setToEdit(food)}>EDIT</button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MenuEditor
