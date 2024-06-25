import React from "react";
import { Receipt } from "lucide-react";

interface Expense {
  bank: string;
  amountOwed: number;
}

interface Props {
  expenses: Expense[];
}

const Card: React.FC<Props> = ({ expenses }) => {
  // Filter expenses with amountOwed > 0
  const filteredExpenses = expenses.filter((expense) => expense.amountOwed > 0);

  return (
    <>
      {filteredExpenses.map((expense) => (
        <div
          key={expense.bank}
          className="h-24 min-w-40 rounded-xl flex justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[#FFCB6F]"
        >
          <div className="flex justify-center items-center gap-4">
            <Receipt />
            <div className="">
              <p className="">${expense.amountOwed}</p>
              <p className="text-xs">{expense.bank}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
