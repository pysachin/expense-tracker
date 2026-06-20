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
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#7f8c8d",
          }}
        >
          No expense data to display
        </div>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e5df" />
          <XAxis dataKey="category" stroke="#7f8c8d" />
          <YAxis stroke="#7f8c8d" />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e8e5df",
              borderRadius: "4px",
            }}
          />
          <Legend />
          <Bar
            dataKey="amount"
            fill="#e67e22"
            name="Amount"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
