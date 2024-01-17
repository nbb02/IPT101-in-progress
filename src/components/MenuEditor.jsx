import React, { useEffect, useState } from "react"
import styles from "../styles/MenuEditor.module.scss"
import { db, auth } from "../Context/Firebase"
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

function MenuEditor() {
  const [orderMenu, setOrderMenu] = useState([])

  const [img, setImg] = useState({
    picturePreview: "",
    pictureFile: "",
  })
  const [foodToAddDetails, setFoodToAddDetails] = useState({
    name: "",
    price: "",
    photoUrl: "",
  })

  function setImage(e) {
    const file = e.target.files[0]
    setImg({
      picturePreview: file ? URL.createObjectURL(file) : "",
      pictureFile: file,
    })
  }

  async function addItemToMenu() {
    const storage = getStorage()
    const storageRef = ref(storage, `foodImages/${foodToAddDetails.name}.jpg`)

    const uploadTask = uploadBytesResumable(storageRef, img.pictureFile)

    uploadTask.on(
      "state_changed",
      () => {
        console.log("in progress")
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFoodToAddDetails((prevState) => ({
            ...prevState,
            photoUrl: downloadUrl,
          }))
        })
      }
    )

    const date = new Date()
    const itemToAdd = {
      id: Date.now(),
      ...foodToAddDetails,
      dateAdded: date.toLocaleString(),
      addedBy: auth?.currentUser?.displayName,
    }

    await updateDoc(doc(db, "orderMenu", "orderMenuItems"), {
      orderMenuItems: arrayUnion(itemToAdd),
    })
  }
  function addItemOnChange(e) {
    const { name, value } = e.target
    setFoodToAddDetails((prevState) => ({ ...prevState, [name]: value }))
    console.log(foodToAddDetails)
  }

  const [toEdit, setToEdit] = useState({ name: "", price: "" })

  function handleEditChange(e) {
    const { name, value } = e.target
    setToEdit((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleEditSubmit() {
    const updatedMenu = orderMenu.map((item) =>
      item.id === toEdit.id
        ? { ...item, name: toEdit.name, price: toEdit.price }
        : item
    )
    await updateDoc(doc(db, "orderMenu", "orderMenuItems"), {
      orderMenuItems: updatedMenu,
    })
    setToEdit({ name: "", price: "" })
  }

  async function setIsAvailable(id) {
    const updatedMenu = orderMenu.map((item) =>
      item.id === id
        ? {
            ...item,
            isAvailable: "isAvailable" in item ? !item.isAvailable : false,
          }
        : item
    )
    await updateDoc(doc(db, "orderMenu", "orderMenuItems"), {
      orderMenuItems: updatedMenu,
    })
  }

  // useEffect(() => {
  //   const orderMenuSnapshot = () => {
  //     onSnapshot(doc(db, "orderMenu", "orderMenuItems"), (doc) => {
  //       setOrderMenu(doc?.data()?.orderMenuItems)
  //       console.log("request ordermenu")
  //     })
  //   }
  //   return () => {
  //     orderMenuSnapshot()
  //   }
  // }, [])

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
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={foodToAddDetails.name}
            onChange={addItemOnChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={foodToAddDetails.price}
            onChange={addItemOnChange}
          />
          <button onClick={addItemToMenu}>Add to Menu</button>
        </div>
      </div>
      {toEdit.id && (
        <>
          <form>
            <div className={styles.editCard}>
              <img src={toEdit.img} alt="" />
              <input
                type="text"
                name="name"
                onChange={handleEditChange}
                value={toEdit.name}
              />
              <p></p>
              <input
                type="text"
                name="price"
                onChange={handleEditChange}
                value={toEdit.price}
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleEditSubmit()
                }}
              >
                Done Editing
              </button>
            </div>
          </form>
        </>
      )}

      <div className={styles.menu}>
        {orderMenu &&
          orderMenu.map((food, index) => (
            <div
              key={index}
              className={`${styles.menuCards} ${
                "isAvailable" in food && food.isAvailable === false
                  ? styles.isUnavailable
                  : ""
              }`}
            >
              <img src={food.img} alt="" />
              <p>{food.name.toString().toUpperCase()}</p>
              <p></p>
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
