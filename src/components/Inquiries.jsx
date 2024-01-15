import React, { useEffect, useState } from "react"
import styles from "../styles/Inquiries.module.scss"
import { auth, db } from "../Context/Firebase"
import { arrayUnion, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

function Inquiries() {
  const [comment, setComment] = useState("")

  const [inquiries, setInquiries] = useState([])

  async function getInquiries() {
    const docRef = doc(db, "inquiryData", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setInquiries(docSnap?.data()?.inquiries)
    }
  }

  async function sendInquiry() {
    if (comment !== "") {
      const date = new Date()
      const inquiryData = {
        id: Date.now(),
        date: date.toLocaleString(),
        comment,
        userName: auth.currentUser.displayName.split(" ")[0],
      }
      console.log(inquiryData)

      await setDoc(
        doc(db, "inquiryData", auth.currentUser.uid),
        {
          inquiries: arrayUnion(inquiryData),
        },
        { merge: true }
      )
      setComment("")
    } else {
      console.log("empty")
    }
  }

  useEffect(() => {
    const inquirySnapshot = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "inquiryData", auth.currentUser.uid), (doc) => {
            setInquiries(doc?.data()?.inquiries)
          })
        }
      })
    }

    return inquirySnapshot()
  }, [])

  return (
    <div>
      <div className={styles.Banner}>
        <h1>Inquiries</h1>
      </div>
      <div className={styles.inquiriesContainer}>
        {inquiries &&
          inquiries.map((item) => {
            return (
              <div className={styles.eachInquiry} key={item.id}>
                <div className={styles.comment}>
                  <p>{item.userName}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            )
          })}
        <form>
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              sendInquiry()
            }}
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  )
}

export default Inquiries
