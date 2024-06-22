import React from "react";

interface Transaction {
  id: number;
  bank: string;
  amount: number;
  type: "addition" | "reduction";
  date: Date;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Transaction History</h2>
      <ul className="mt-4 space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`p-2 border rounded ${
              transaction.type === "addition" ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <div className="flex justify-between">
              <span>{transaction.bank}</span>
              <span className="truncate">
                {transaction.type === "addition" ? "+" : "-"}$
                {transaction.amount}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              {transaction.date.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
