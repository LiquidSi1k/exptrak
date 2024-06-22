import React, { useState } from "react";

interface Expense {
  bank: string;
  amountOwed: number;
}

interface ExpenseFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    inputValueNum: number,
    dropDown: string
  ) => void;
  expenses: Expense[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  handleSubmit,
  expenses,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [dropDownValue, setDropDownValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropDownValue(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, parseFloat(inputValue), dropDownValue)}
    >
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Amount"
          value={inputValue}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <select
          value={dropDownValue}
          onChange={handleDropDownChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Expense</option>
          {expenses.map((expense, index) => (
            <option key={expense.bank} value={index.toString()}>
              {expense.bank}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-black text-white p-2 rounded">
          Reduce Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
