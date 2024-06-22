import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Expense {
  bank: string;
  amountOwed: number;
  date: string;
}

interface BarChartMainProps {
  expenses: Expense[];
}

const BarChartMain: React.FC<BarChartMainProps> = ({ expenses }) => {
  // Aggregate expenses by date
  const aggregatedData: { date: string; totalExpenses: number }[] = [];

  expenses.forEach((expense) => {
    const existingEntry = aggregatedData.find(
      (entry) => entry.date === expense.date
    );
    if (existingEntry) {
      existingEntry.totalExpenses += expense.amountOwed;
    } else {
      aggregatedData.push({
        date: expense.date,
        totalExpenses: expense.amountOwed,
      });
    }
  });

  // Calculate cumulative total expenses
  for (let i = 1; i < aggregatedData.length; i++) {
    aggregatedData[i].totalExpenses += aggregatedData[i - 1].totalExpenses;
  }

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart data={aggregatedData}>
        {/* <CartesianGrid strolkeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalExpenses" fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartMain;
