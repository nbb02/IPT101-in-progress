import React, { useEffect, useRef, useState } from "react"
import styles from "../styles/Inquiries.module.scss"
import { auth, db } from "../Context/Firebase"
import { arrayUnion, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

function Inquiries() {
  const imgRef = useRef()

  const [inquiries, setInquiries] = useState([])

  // async function getInquiries() {
  //   const docRef = doc(db, "inquiryData", auth.currentUser.uid)
  //   const docSnap = await getDoc(docRef)
  //   if (docSnap.exists()) {
  //     setInquiries(docSnap?.data()?.inquiries)
  //   }
  // }
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
  const [reply, setReply] = useState({ message: "" })

  async function sendReply() {
    if (reply.message || img.pictureFile) {
      const date = new Date()

      if (img.pictureFile) {
        await uploadPicture()
        setReply({ message: "" })
        setImg({
          picturePreview: "",
          pictureFile: "",
        })
        imgRef.current.value = ""
      } else {
        await setDoc(
          doc(db, "inquiryData", auth.currentUser.uid),
          {
            userName: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
            photoURL: auth.currentUser.photoURL,
            inquiries: arrayUnion({
              message: reply.message,
              date: date.toLocaleString(),
              isUser: true,
            }),
          },
          { merge: true }
        )
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
            const date = new Date()
            await setDoc(
              doc(db, "inquiryData", auth.currentUser.uid),
              {
                userName: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
                photoURL: auth.currentUser.photoURL,
                inquiries: arrayUnion({
                  message: reply.message,
                  date: date.toLocaleString(),
                  isUser: true,
                  photoURL: downloadUrl,
                }),
              },
              { merge: true }
            )
            setReply({ message: "" })
            setImg({
              picturePreview: "",
              pictureFile: "",
            })
            imgRef.current.value = ""
          }
        )
      }
    )
  }

  useEffect(() => {
    const inquirySnapshot = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(doc(db, "inquiryData", auth.currentUser.uid), (doc) => {
            setInquiries(doc?.data()?.inquiries)
            console.log(doc?.data()?.inquiries)
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
      <div className={styles.chatbox}>
        <div className={styles.chatsContainer}>
          {inquiries &&
            inquiries.map((item, index) => {
              return (
                <div
                  className={
                    styles[`${item.isUser ? "adminChat" : "userChat"}`]
                  }
                  key={index}
                >
                  <p>{item.date}</p>
                  <p>{item.message}</p>
                  {item.photoURL && <img src={item.photoURL} />}
                </div>
              )
            })}
        </div>

        <form>
          <input
            type="text"
            value={reply.message}
            onChange={(e) => {
              setReply((prevState) => ({
                ...prevState,
                message: e.target.value,
              }))
            }}
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
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Inquiries
