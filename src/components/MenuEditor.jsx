import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../Context/Context"
import styles from "../styles/MenuEditor.module.scss"
import axios from "axios"

function MenuEditor() {
  const { orderMenu, editOrderMenu, setOrderMenu } = useContext(Context)

  const imgRef = useRef()

  const [img, setImg] = useState({
    picturePreview: "",
    pictureFile: "",
  })

  const [addToMenu, setAddToMenu] = useState({
    name: "",
    time: "",
    img: "",
    price: "",
  })

  const [toEdit, setToEdit] = useState({
    name: "",
    time: "",
    price: "",
  })

  function setImage(e) {
    const file = e.target.files[0]
    setImg({
      picturePreview: file ? URL.createObjectURL(file) : "",
      pictureFile: file,
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

        setImg({
          picturePreview: "",
          pictureFile: "",
        })
        setAddToMenu({
          name: "",
          time: "",
          img: "",
          price: "",
        })
        imgRef.current.value = ""
      })
  }

  function addItemOnChange(e) {
    const { name, value } = e.target

    setAddToMenu((prevState) => ({ ...prevState, [name]: value }))
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

  function setIsAvailable(id) {
    setOrderMenu((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              isAvailable: "isAvailable" in item ? !item.isAvailable : false,
            }
          : item
      )
    )
  }
  useEffect(() => {
    console.log(orderMenu)
  }, [orderMenu])

  return (
    <div className={styles.MenuEditor}>
      <h2>Menu Editor</h2>
      <div>
        <label className={styles.addItemBtn}>
          Add Item to The Menu <input type="checkbox" />
        </label>
        <div className={styles.addItemCard}>
          <img src={img.picturePreview} alt="" />
          <input
            type="file"
            name="img"
            placeholder="Image"
            onChange={setImage}
            ref={imgRef}
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
            <div
              key={food.id}
              className={`${styles.menuCards} ${
                "isAvailable" in food && food.isAvailable === false
                  ? styles.isUnavailable
                  : ""
              }`}
            >
              <img src={food.img} alt="" />
              <p>{food.name.toString().toUpperCase()}</p>
              <p>{food.time}</p>
              <p>₱ {food.price}</p>
              <div className={styles.button}>
                <button onClick={() => setToEdit(food)}>Edit Item</button>
                <button onClick={() => setIsAvailable(food.id)}>
                  {"isAvailable" in food && food.isAvailable === false
                    ? "Mark as Available"
                    : `Mark as Unavailable`}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MenuEditor
