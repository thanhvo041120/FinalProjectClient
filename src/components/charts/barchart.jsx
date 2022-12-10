import React from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
const BarChart = ({ chartData, text }) => {
  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: text,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default BarChart;
