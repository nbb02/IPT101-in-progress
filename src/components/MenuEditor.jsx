import React, { useContext, useState } from "react"
import { Context } from "../Context/Context"
import styles from "../styles/MenuEditor.module.scss"
import axios from "axios"

function MenuEditor() {
  const { orderMenu, editOrderMenu, setOrderMenu } = useContext(Context)

  const [img, setImg] = useState({
    picturePreview: "",
    pictureFile: "",
  })

  const [addToMenu, setAddToMenu] = useState({
    name: "",
    time: "",
    img: "",
    price: 0,
  })

  const [toEdit, setToEdit] = useState({
    name: "",
    time: "",
    price: "",
  })

  function setImage(e) {
    setImg({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureFile: e.target.files[0],
    })
  }

  function addItemToMenu() {
    const formData = new FormData()
    formData.append("image", img.pictureFile)
    axios
      .post(
        "https://api.imgbb.com/1/upload?&key=85587e7e4fa1b9ca6453dd5abbf8ac34",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setOrderMenu((prevState) => [
          {
            id: prevState.length + 1,
            ...addToMenu,
            img: res.data.data.display_url,
          },
          ...prevState,
        ])
        console.log(orderMenu)
        console.log(res.data)
      })
  }

  function addItemOnChange(e) {
    const { name, value } = e.target

    setAddToMenu((prevState) => ({ ...prevState, [name]: value }))
    console.log(addToMenu)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setToEdit((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = orderMenu.filter((item) => item.id !== toEdit.id)
    editOrderMenu([toEdit, ...data])
    setToEdit({
      name: "",
      time: "",
      price: "",
    })
  }

  return (
    <div className={styles.MenuEditor}>
      <h2>Menu Editor</h2>
      <div>
        <div className={styles.editCard}>
          <img src={img.picturePreview} alt="" />
          <input
            type="file"
            name="img"
            placeholder="Image"
            onChange={setImage}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={addToMenu.name}
            onChange={addItemOnChange}
          />
          <input
            type="text"
            name="time"
            placeholder="TimeEaten"
            value={addToMenu.time}
            onChange={addItemOnChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={addToMenu.price}
            onChange={addItemOnChange}
          />
          <button onClick={addItemToMenu}>Add to Menu</button>
        </div>
      </div>
      {toEdit.id && (
        <>
          <form onSubmit={handleSubmit}>
            <div className={styles.editCard}>
              <img src={toEdit.img} alt="" />
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
            </div>
          </form>
        </>
      )}

      <div className={styles.menu}>
        {orderMenu &&
          orderMenu.map((food) => (
            <div key={food.name} className={styles.menuCards}>
              <img src={food.img} alt="" />
              <p>{food.name.toString().toUpperCase()}</p>
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
