import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import OrdersPage from "./Pages/OrdersPage"
import SignInPage from "./Pages/SignInPage"
import TransactionsPage from "./Pages/TransactionsPage"
import TransactionPage from "./Pages/TransactionPage"
import AccountPage from "./Pages/AccountPage"
import "../App.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Orders" element={<OrdersPage />} />
        <Route path="/Transactions" element={<TransactionsPage />} />
        <Route
          path="/Transaction/:transactionId"
          element={<TransactionPage />}
        />
        <Route path="/Account" element={<AccountPage />} />
        dasdsa
      </Routes>
    </div>
  )
}

export default App
