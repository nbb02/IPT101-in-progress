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
import { useContext } from "react"
import { Context } from "./Context/Context"

function App() {
  const { access } = useContext(Context)

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
            <Route path="/Admin" element={<Page element={<Admin />} />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
