import toast, {Toaster} from "react-hot-toast";
import "./TransactionCard.css";
import axios from "axios";

function TransactionCard({ _id, title, amount, category, type, createdAt, loadTransactions }) {

  const deleteTransaction = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)

    toast.success(response.data.message)

    loadTransactions()
  }

  return (
    <div className="transaction-card">
      <h1 className="transaction-card-title">
        {title}
      </h1>

      <span className="transaction-card-date">
        {new Date(createdAt).toLocaleString()}
      </span>

      <span className="transaction-card-category">
        {category}
      </span>

      <span className="transaction-card-amount" style={{
        color: type === "credit" ? "green": "red"
      }}>
        {type === "credit" ? "+": "-"}
        {amount}
      </span>

      <button className="transaction-card-delete" onClick={deleteTransaction}>
        Delete
      </button>
      <Toaster />
    </div>
  )
}

export default TransactionCard
