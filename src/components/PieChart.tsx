import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PieChartMainProps {
  totalExpenses: number;
}

const PieChartMain: React.FC<PieChartMainProps> = ({ totalExpenses }) => {
  const [prevBudget, setPrevBudget] = useState(totalExpenses);

  useEffect(() => {
    setPrevBudget((prevBudget) =>
      prevBudget !== totalExpenses ? prevBudget : totalExpenses
    );
  }, [totalExpenses]);

  const remainingBudget = prevBudget - totalExpenses;

  const data = [
    { name: "Expenses", value: totalExpenses },
    {
      name: "Remaining Budget",
      value: remainingBudget > 0 ? remainingBudget : 0,
    },
  ];

  const colors = ["#F97316", "#00C49F"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          animationBegin={0}
          cornerRadius={10}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartMain;
