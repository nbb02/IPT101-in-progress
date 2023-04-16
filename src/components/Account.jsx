import React, { useContext, useState } from "react"
import styles from "../styles/Account.module.scss"
import { Context } from "../Context/Context"

function Account() {
  const { myAddresses, handleAddressSubmit, deleteAddress } =
    useContext(Context)

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    street: "",
    isHome: "",
    otherInfo: "",
  })

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit() {
    const data = Object.values(formData)
    data.pop()
    const hasBlanks = data.some((item) => item.toString().trim() === "")

    hasBlanks &&
      alert("Please fill all blanks, only Additional Info can be left blank. ")

    if (!hasBlanks) {
      handleAddressSubmit(formData)
      setFormData({
        fullName: "",
        phoneNumber: "",
        location: "",
        street: "",
        isHome: "",
        otherInfo: "",
      })
    }
  }

  return (
    <div className={styles.Account}>
      <div className={styles.AccountBanner}>
        <h1>Account</h1>
      </div>
      <div className={styles.AccountSettingsContainer}>
        <div className={styles.AccountSettings}>
          <h2>Account Settings</h2>
          <p>Name: Citadel's Bistro</p>
          <p>Email: n******123@gmail.com</p>
          <p>Username: Citadel</p>
          <button>ChangePassword</button>
        </div>
        <div className={styles.Addresses}>
          <h2>My Addresses</h2>
          <div className={styles.AddressesContainer}>
            {myAddresses.length > 0 ? (
              myAddresses.map((address) => {
                const {
                  id,
                  fullName,
                  phoneNumber,
                  location,
                  street,
                  isHome,
                  otherInfo,
                } = address

                return (
                  <div key={id} className={styles.eachAddress}>
                    <p>
                      {fullName} | {phoneNumber}
                    </p>
                    <p>
                      {location}
                      {street}
                      {otherInfo}
                    </p>
                    <p>{isHome}</p>
                    <button onClick={() => deleteAddress(id)}>
                      Delete Address
                    </button>
                  </div>
                )
              })
            ) : (
              <h2 style={{ textAlign: "center" }}>
                No Address Yet, Add one below
              </h2>
            )}
          </div>
          <div className={styles.AddAddresses}>
            <label className={styles.addButton}>
              Add Address
              <input type="checkbox" />
            </label>
            <form>
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                value={formData.fullName}
              />
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
              <label htmlFor="">Province, City, Barangay</label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                value={formData.location}
              />
              <label htmlFor="">Street, Building, House No.</label>
              <input
                type="text"
                name="street"
                onChange={handleChange}
                value={formData.street}
              />
              <label htmlFor="">Home/Work</label>
              <input
                type="text"
                name="isHome"
                onChange={handleChange}
                value={formData.isHome}
              />
              <label htmlFor="">Additional Info</label>
              <input
                type="text"
                name="otherInfo"
                onChange={handleChange}
                value={formData.otherInfo}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
