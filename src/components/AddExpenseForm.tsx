import React, { useState, useEffect } from "react";

interface Expense {
  bank: string;
  amountOwed: number;
  date: string;
}

interface AddExpenseFormProps {
  addExpense: (bank: string, amountOwed: number, date: string) => void;
  expenses: Expense[];
  removeExpense: (bank: string) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  addExpense,
  expenses,
  removeExpense,
}) => {
  const [bank, setBank] = useState("");
  const [amountOwed, setAmountOwed] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addExpense(bank, parseFloat(amountOwed), date);
    setBank("");
    setAmountOwed("");
    // Optionally clear date after submission
    // setDate("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={amountOwed}
            onChange={(e) => setAmountOwed(e.target.value)}
            placeholder="Amount Owed"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-black text-white p-2 rounded">
            Add Expense
          </button>
        </div>
      </form>
      <div className="mt-4">
        {expenses.map((expense) => (
          <div
            key={expense.bank}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{expense.bank}</span>
            <button
              onClick={() => removeExpense(expense.bank)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddExpenseForm;
