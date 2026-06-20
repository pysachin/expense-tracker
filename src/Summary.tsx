import type { Transaction } from "./types";

interface SummaryProps {
  transactions: Transaction[];
}

export function Summary({ transactions }: Readonly<SummaryProps>) {
  const totalIncome: number = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses: number = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance: number = totalIncome - totalExpenses;

  // Calculate percentages for the visualization
  const total: number = totalIncome + totalExpenses || 100;
  const incomePercent: number = (totalIncome / total) * 100;
  const expensePercent: number = (totalExpenses / total) * 100;

  return (
    <>
      <div className="balance-visualization">
        <div className="balance-meter">
          <div
            className="balance-meter-income"
            style={{ width: `${incomePercent}%` }}
          >
            {incomePercent > 15 && `$${totalIncome.toLocaleString()}`}
          </div>
          <div
            className="balance-meter-expenses"
            style={{ width: `${expensePercent}%` }}
          >
            {expensePercent > 15 && `$${totalExpenses.toLocaleString()}`}
          </div>
        </div>
        <div className="balance-labels">
          <div>
            <div style={{ color: "#27ae60", fontWeight: "600" }}>Income</div>
          </div>
          <div>
            <div style={{ color: "#e67e22", fontWeight: "600" }}>Expenses</div>
          </div>
        </div>
      </div>
      <div className="summary">
        <div className="summary-card">
          <h3>Total Income</h3>
          <p className="income-amount">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <p className="balance-amount">${balance.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}
