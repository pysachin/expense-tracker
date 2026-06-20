export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
}

export type TransactionType = "income" | "expense";
export type FilterType = "all" | TransactionType;
