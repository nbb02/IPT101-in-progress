import { Routes, Route, Link } from "react-router-dom"
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/Home" element={<Page element={<Home />} />} />
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
        <Route path="/Admin" element={<Page element={<Admin />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
