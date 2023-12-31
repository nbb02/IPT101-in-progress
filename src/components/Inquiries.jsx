import React, { useContext, useState } from "react"
import styles from "../styles/Inquiries.module.scss"
import { Context } from "../Context/Context"

function Inquiries() {
  const { inquiries, setInquiries } = useContext(Context)

  const [comment, setComment] = useState({ data: "" })

  function handleSubmit(e) {
    e.preventDefault()
    if (comment.data.trim() !== "") {
      setInquiries((prevState) => [
        {
          id: prevState.length + 1,
          userName: "Citadel's Bistro",
          comment: comment.data,
        },
        ...prevState,
      ])
    }
    setComment({ data: "" })
  }

  function handleReply(e, id) {
    let value = e.target.previousElementSibling.value
    if (value.trim() !== "") {
      setInquiries((prevState) => {
        return prevState.map((item) =>
          item.id === id
            ? {
                ...item,
                replies: item.replies
                  ? [
                      ...item.replies,
                      {
                        id: item.replies.length + 1,
                        userName: "Citadel's Bistro",
                        reply: value,
                      },
                    ]
                  : [
                      {
                        id: 1,
                        userName: "Citadel's Bistro",
                        reply: value,
                      },
                    ],
              }
            : item
        )
      })
    }
    e.target.previousElementSibling.value = ""
  }

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

                  <input type="text" />
                  <button onClick={(e) => handleReply(e, item.id)}>
                    Reply
                  </button>
                </div>

                {item.replies &&
                  item.replies.length > 0 &&
                  item.replies.map((reply) => (
                    <div className={styles.reply} key={reply.id}>
                      <p>{reply.userName}</p>
                      <p>{reply.reply}</p>
                    </div>
                  ))}
              </div>
            )
          })}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment.data}
            onChange={(e) => setComment({ data: e.target.value })}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  )
}

export default Inquiries
