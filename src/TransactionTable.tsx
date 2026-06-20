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
              className={
                t.type === "income" ? "income-amount" : "expense-amount"
              }
            >
              {t.type === "income" ? "+" : "-"}${t.amount}
            </td>
            <td>
              {onDeleteTransaction ? (
                <button
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
