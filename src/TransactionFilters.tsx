import type { ChangeEvent } from "react";
import type { FilterType } from "./types";

interface TransactionFiltersProps {
  filterType: FilterType;
  filterCategory: string;
  onFilterTypeChange: (type: FilterType) => void;
  onFilterCategoryChange: (category: string) => void;
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

export function TransactionFilters({
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
}: Readonly<TransactionFiltersProps>) {
  return (
    <div className="filters">
      <select
        value={filterType}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onFilterTypeChange(e.target.value as FilterType)
        }
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={filterCategory}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onFilterCategoryChange(e.target.value)
        }
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
