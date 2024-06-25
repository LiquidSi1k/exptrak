import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Card from "./components/Card";
import ExpenseForm from "./components/ExpenseForm";
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
import { Hexagon, RotateCcw } from "lucide-react";
import { useLocalStorage } from "./constant/useLocalStorage";
import DialogOnStart from "./components/Dialog";

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

const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState<string>(() => {
    const storedName = localStorage.getItem("userName");
    return storedName || "";
  });

  const {
    setItem: setExpensesItem,
    getItem: getExpensesItem,
    // removeItem: removeExpensesItem,
  } = useLocalStorage("expenses");

  const { setItem: setTransactionsItem, getItem: getTransactionsItem } =
    useLocalStorage("transactions");

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amountOwed, 0);

  useEffect(() => {
    const storedExpenses = getExpensesItem();
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }

    const storedTransactions = getTransactionsItem();
    if (storedTransactions) {
      setTransactions(storedTransactions);
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
    const currentAmountOwed = expenses[index].amountOwed;

    if (currentAmountOwed < inputValueNum) {
      // Handle the case where the input value exceeds the current amount owed
      console.error("Input value exceeds current amount owed.");
      return;
    }

    const updatedExpenses = expenses.map((exp, i) =>
      i === index ? { ...exp, amountOwed: exp.amountOwed - inputValueNum } : exp
    );

    setExpenses(updatedExpenses);

    try {
      setExpensesItem(updatedExpenses.filter((exp) => exp.amountOwed > 0));
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

    try {
      setTransactionsItem([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error updating local storage:", error);
    }
  };

  const addExpense = (bank: string, amountOwed: number, date: string) => {
    const newExpense: Expense = { bank, amountOwed, date };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    try {
      setExpensesItem([...expenses, newExpense]);
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

    try {
      setTransactionsItem([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error updating local storage:", error);
    }
  };

  const removeExpense = (bank: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.bank !== bank);
    setExpenses(updatedExpenses);
    try {
      setExpensesItem(updatedExpenses);
    } catch (error) {
      console.error("Error updating local storage:", error);
    }
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    localStorage.setItem("userName", newName);
  };

  const handleNameReset = () => {
    setName("");
    localStorage.removeItem("userName");
  };

  return (
    <>
      <Nav />
      <header className="px-4 lg:px-20 pt-10 text-3xl font-semibold">
        <div className="flex items-center gap-2 relative">
          <Hexagon /> <span>Welcome</span> {name ? name : "Guest"}!{" "}
          <RotateCcw
            className="absolute top-0 right-0 cursor-pointer"
            size={15}
            onClick={handleNameReset}
          />
        </div>
      </header>
      <main className="px-5 lg:px-20 pt-10 flex w-full max-lg:flex-col">
        <section className="w-full lg:w-4/5 mr-2 relative">
          <div className="w-full h-[26rem] lg:flex rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] pl-2 relative">
            <div className="w-full h-full">
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
            <div className="flex gap-4 w-full overflow-x-auto py-3 px-1">
              <Card expenses={expenses} />
            </div>
          </div>
        </section>

        <section className="lg:border-l w-full lg:w-1/5 h-[85vh] overflow-y-auto relative">
          <div className="sticky top-0 ml-1">
            <ExpenseForm handleSubmit={handleSubmit} expenses={expenses} />
          </div>

          <div>
            <TransactionHistory transactions={transactions} />
          </div>
        </section>
      </main>

      {name ? null : <DialogOnStart onNameSubmit={handleNameChange} />}
    </>
  );
};

export default App;
