import React, { useEffect, useRef, useState } from "react"
import { auth, db } from "../Context/Firebase"
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import styles from "../PagesStyles/AdminInquiries.module.scss"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

function AdminInquiries() {
  const imgRef = useRef()

  const [inquiryData, setInquiryData] = useState([])
  const [chatData, setChatData] = useState([])

  const [img, setImg] = useState({
    picturePreview: "",
    pictureFile: "",
  })

  function setImage(e) {
    const file = e.target?.files[0]
    setImg({
      picturePreview: file ? URL.createObjectURL(file) : "",
      pictureFile: file,
    })
  }

  useEffect(() => {
    const inquiryDataSnapshot = () => {
      onSnapshot(collection(db, "inquiryData"), (snapshot) => {
        const inquiries = []
        snapshot.forEach((doc) => {
          inquiries.push(doc.data())
        })
        setInquiryData(inquiries)
      })
    }

    return inquiryDataSnapshot()
  }, [])

  const [reply, setReply] = useState({ message: "" })

  async function sendReply() {
    if (reply.message || img.pictureFile) {
      const date = new Date()
      let replyData = {
        message: reply.message,
        date: date.toLocaleString(),
        isUser: false,
      }
      if (img.pictureFile) {
        await uploadPicture(replyData)
        setReply({ message: "" })
        setImg({
          picturePreview: "",
          pictureFile: "",
        })
        imgRef.current.value = ""
      } else {
        console.log(replyData)
        await updateDoc(doc(db, "inquiryData", chatData.uid), {
          inquiries: arrayUnion(replyData),
        })
        setReply({ message: "" })
        setImg({
          picturePreview: "",
          pictureFile: "",
        })
        imgRef.current.value = ""
      }
    } else {
      alert("There are no inputs")
    }
  }

  async function uploadPicture(data) {
    const storage = getStorage()
    const storageRef = ref(storage, `inquiries/${Date.now()}.jpg`)

    const uploadTask = uploadBytesResumable(storageRef, img.pictureFile)

    uploadTask.on(
      "state_changed",
      () => {
        console.log("in progress")
      },
      (error) => {
        console.log(error)
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadUrl) => {
            console.log(data)
            await updateDoc(doc(db, "inquiryData", chatData.uid), {
              inquiries: arrayUnion({ ...data, photoURL: downloadUrl }),
            })
            console.log(downloadUrl)
          }
        )
      }
    )
  }

  useEffect(() => {
    if (chatData) {
      setChatData(inquiryData.find((inquiry) => inquiry.uid === chatData.uid))
    }
    console.log(inquiryData)
  }, [inquiryData])

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Inquiries</h1>
      </div>
      {inquiryData ? (
        <div className={styles.usersContainer}>
          {inquiryData.map((inquiry, index) => {
            const { username, photoURL } = inquiry
            return (
              <div
                key={index}
                className={styles.chat}
                onClick={() => {
                  setChatData(inquiry)
                }}
              >
                <img
                  src={photoURL}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
                <p>{username}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <h1>Inquiries Empty</h1>
        </div>
      )}

      {chatData?.inquiries && (
        <div className={styles.chatbox}>
          <div>
            <button onClick={() => setChatData([])}>back</button>
          </div>
          <div className={styles.chatsContainer}>
            {chatData.inquiries.map((chat, index) => {
              const { message, date, isUser, photoURL } = chat

              return (
                <div
                  key={index}
                  className={styles[`${isUser ? "userChat" : "adminChat"}`]}
                >
                  <p>{date}</p>
                  <p>{message}</p>
                  {photoURL && <img src={photoURL} />}
                </div>
              )
            })}
          </div>
          <form>
            <input
              type="text"
              value={reply.message}
              onChange={(e) =>
                setReply((prevState) => ({
                  ...prevState,
                  message: e.target.value,
                }))
              }
            />
            <input
              type="file"
              name="image"
              placeholder="image"
              onChange={setImage}
              ref={imgRef}
            />
            {img.picturePreview && <img src={img.picturePreview} alt="" />}
            {img.pictureFile && (
              <button
                type="button"
                onClick={() => {
                  setImage({
                    picturePreview: "",
                    pictureFile: "",
                  })
                  imgRef.current.value = ""
                }}
              >
                X
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault()
                sendReply()
              }}
            >
              send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminInquiries
