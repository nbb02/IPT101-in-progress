import { Routes, Route, Link } from "react-router-dom"
import "../App.scss"
import HomePage from "./Pages/HomePage"
import OrdersPage from "./Pages/OrdersPage"
import SignInPage from "./Pages/SignInPage"
import TransactionsPage from "./Pages/TransactionsPage"
import TransactionPage from "./Pages/TransactionPage"
import AccountPage from "./Pages/AccountPage"
import AdminPage from "./Pages/AdminPage"

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
        <Route path="/Admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <h1>
              Not Found <Link to="/Home">Home</Link>
            </h1>
          }
        />
      </Routes>
    </div>
  )
}

export default App
