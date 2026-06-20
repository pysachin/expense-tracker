import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Transaction, TransactionType } from "./types";

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const CATEGORIES: string[] = [
  "food",
  "housing",
  "utilities",
  "transport",
  "entertainment",
  "salary",
  "other",
];

export function TransactionForm({
  onAddTransaction,
}: Readonly<TransactionFormProps>) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<string>("food");

  const handleSubmit = (
    e: ChangeEvent<HTMLFormElement> & { preventDefault: () => void },
  ): void => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: Number.parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
        />
        <select
          value={type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setType(e.target.value as TransactionType)
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
