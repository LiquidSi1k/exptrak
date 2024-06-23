import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Card from "./components/Card";
import ExpenseForm from "./components/ExpenseForm";
// import expensesData from "./constant/expenses.json";
import { Add02Icon, Invoice03Icon, DollarSend02Icon } from "hugeicons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TransactionHistory from "./components/TransHx";
import AddExpenseForm from "./components/AddExpenseForm";
import BarChartMain from "./components/BarChart";
import PieChart from "./components/PieChart";
import { Hexagon } from "lucide-react";
import { useLocalStorage } from "./constant/useLocalStorage";

interface Expense {
  bank: string;
  amountOwed: number;
  date: string;
}

interface Transaction {
  id: number;
  bank: string;
  amount: number;
  type: "addition" | "reduction";
  date: Date;
}

// const initialExpenses: Expense[] = expensesData.expenses;

const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  console.log({ expenses });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  console.log({ transactions });

  const { setItem, getItem, removeItem } = useLocalStorage("value");

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amountOwed, 0);

  useEffect(() => {
    const storedValue = getItem();
    if (storedValue) {
      setExpenses(storedValue);
    }
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    inputValueNum: number,
    dropDown: string
  ) => {
    e.preventDefault();
    const index = parseInt(dropDown);
    const bank = expenses[index].bank;

    setExpenses((prevExpenses) =>
      prevExpenses.map((exp, i) =>
        i === index
          ? { ...exp, amountOwed: exp.amountOwed - inputValueNum }
          : exp
      )
    );

    // Update local storage with updated expenses directly from prevExpenses
    try {
      setItem(
        expenses.map((exp, i) =>
          i === index
            ? { ...exp, amountOwed: exp.amountOwed - inputValueNum }
            : exp
        )
      );
    } catch (error) {
      console.error("Error updating local storage:", error);
    }

    setValue((prev) => prev + inputValueNum);

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      bank,
      amount: inputValueNum,
      type: "reduction",
      date: new Date(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const addExpense = (bank: string, amountOwed: number, date: string) => {
    const newExpense: Expense = { bank, amountOwed, date };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    try {
      setItem([...expenses, newExpense]);
    } catch (error) {
      console.error("Error updating local storage:", error);
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      bank,
      amount: amountOwed,
      type: "addition",
      date: new Date(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const removeExpense = (bank: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.bank !== bank);

    setExpenses(updatedExpenses);

    removeItem();
  };

  return (
    <>
      <Nav />
      <header className="px-4 lg:px-20 pt-10 text-3xl font-semibold">
        <p className="flex items-center gap-2">
          <Hexagon /> Welcome Name!
        </p>
      </header>
      <main className="px-5 lg:px-20 pt-10 flex w-full max-lg:flex-col">
        <section className="w-full lg:w-4/5 mr-2 relative">
          <div className="w-full h-[26rem] lg:flex rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] pl-2 relative">
            <div className="w-full h-full">
              {/* info */}
              <div className="flex gap-4">
                <div className="flex-center flex-col h-24 w-30 p-2 gap-1">
                  <div className="flex gap-1">
                    <Invoice03Icon className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-1 bg-orange-200" />
                    <p className="">${totalExpenses}</p>
                  </div>
                  <p className="text-xs">Total Expenses</p>
                </div>
                <div className="flex-center flex-col h-24 w-30 p-2 gap-1">
                  <div className="flex gap-1">
                    <DollarSend02Icon className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-1 bg-orange-200" />
                    <p>${value}</p>
                  </div>
                  <p className="text-xs">Added resources</p>
                </div>
              </div>
              {/* chart */}
              <div className="h-4/6">
                <BarChartMain expenses={expenses} />
              </div>
            </div>
            <div className="flex-center min-w-72 lg:border-l my-2 lg:relative  pieChart">
              <PieChart totalExpenses={totalExpenses} />
              <p className="absolute w-fit h-fit text-sm font-semibold">
                ${totalExpenses} Left
              </p>
            </div>
          </div>

          <div className="my-2">
            <div className="flex justify-between items-center relative">
              <p className="py-10 text-xl font-semibold">Current Expenses</p>
              <Popover>
                <PopoverTrigger>
                  <Add02Icon className="mr-4 hover:scale-110 active:scale-100 bg-orange-200 rounded-full p-1 drop-shadow-md" />
                </PopoverTrigger>
                <PopoverContent>
                  <AddExpenseForm
                    addExpense={addExpense}
                    expenses={expenses}
                    removeExpense={removeExpense}
                  />
                </PopoverContent>
              </Popover>
              <div className="absolute bottom-0 right-3 swipe-right">
                <div className=" w-2 h-2 border-r-2 border-t-2 border-orange-200 rotate-45" />
              </div>
            </div>
            <div
              className="flex gap-4 w-full overflow-x-auto py-3 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <Card expenses={expenses} />
            </div>
          </div>
        </section>

        <section
          className="lg:border-l w-full lg:w-1/5 h-[85vh] overflow-y-auto relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="sticky top-0 ml-1">
            <ExpenseForm handleSubmit={handleSubmit} expenses={expenses} />
          </div>

          <div className="">
            <TransactionHistory transactions={transactions} />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
