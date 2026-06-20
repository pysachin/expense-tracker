import type { Transaction } from "./types";

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: number) => void;
}

export function TransactionTable({
  transactions,
  onDeleteTransaction,
}: Readonly<TransactionTableProps>) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td
              className={`amount-cell ${
                t.type === "income" ? "income" : "expense"
              }`}
            >
              {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
            </td>
            <td>
              {onDeleteTransaction ? (
                <button
                  className="delete-btn"
                  onClick={() => onDeleteTransaction(t.id)}
                  aria-label={`Delete transaction ${t.description}`}
                >
                  Delete
                </button>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
