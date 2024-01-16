import { Routes, Route } from "react-router-dom"
import "../App.scss"
import SignInPage from "./Pages/SignInPage"
import Page from "./Pages/Page"
import Home from "./components/Home"
import Orders from "./components/Orders"
import Transactions from "./components/Transactions"
import Transaction from "./components/Transaction"
import Account from "./components/Account"
import Admin from "./components/Admin"
import NotFound from "./components/NotFound"
import About from "./components/About"
import Inquiries from "./components/Inquiries"
import { useContext, useEffect, useState } from "react"
import { Context } from "./Context/Context"
import { auth, db } from "./Context/Firebase"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import AdminInquiries from "./adminComponents/AdminInquiries"

function App() {
  const { access } = useContext(Context)

  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const checkAdminRights = () => {
      onAuthStateChanged(auth, (user) => {
        async function getUserDetails() {
          const docSnap = await getDoc(
            doc(db, "userDetails", auth.currentUser.uid)
          )
          if (docSnap.exists()) {
            setAdmin(docSnap?.data()?.Admin)
          }
        }

        if (user) {
          getUserDetails()
        }
      })
    }
    return checkAdminRights()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Page element={<Home />} orderElement={<Orders />} />}
        />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/About" element={<Page element={<About />} />} />
        <Route path="*" element={<NotFound />} />
        {access && (
          <>
            <Route path="/Orders" element={<Page element={<Orders />} />} />
            <Route
              path="/Transactions"
              element={<Page element={<Transactions />} />}
            />
            <Route
              path="/Transaction/:transactionId"
              element={<Page element={<Transaction />} />}
            />
            <Route path="/Account" element={<Page element={<Account />} />} />
            <Route
              path="/Inquiries"
              element={<Page element={<Inquiries />} />}
            />
            {admin && (
              <>
                <Route path="/Admin" element={<Page element={<Admin />} />} />
                <Route
                  path="/AdminInquiries"
                  element={<Page element={<AdminInquiries />} />}
                />
              </>
            )}
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
