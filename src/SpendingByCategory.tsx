import type React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Transaction } from "./types";

interface CategorySpending {
  category: string;
  amount: number;
}

interface SpendingByCategoryProps {
  transactions: Transaction[];
}

export const SpendingByCategory: React.FC<SpendingByCategoryProps> = ({
  transactions,
}) => {
  // Filter to expenses only and group by category
  const categoryData: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      const category = transaction.category;
      categoryData[category] =
        (categoryData[category] || 0) + transaction.amount;
    });

  // Convert to array format for recharts
  const chartData: CategorySpending[] = Object.entries(categoryData)
    .map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  if (chartData.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        No expense data to display
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="amount" fill="#ef4444" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
