import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const LineChart = () => {
  // Sample data for the line chart

  const { t } = useTranslation();

  const chartData = {
    options: {
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Expenses",
        },
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "JUR",
        data: [
          [new Date("2023-07-01").getTime(), 100],
          [new Date("2023-07-02").getTime(), 80],
          [new Date("2023-07-03").getTime(), 120],
          // Add more data points as needed
        ],
      },
      {
        name: "HOSANQ",
        data: [
          [new Date("2023-07-01").getTime(), 50],
          [new Date("2023-07-02").getTime(), 70],
          [new Date("2023-07-03").getTime(), 60],
          // Add more data points as needed
        ],
      },
      {
        name: "MODE VALUES",
        data: [
          [new Date("2023-07-01").getTime(), 30],
          [new Date("2023-07-02").getTime(), 40],
          [new Date("2023-07-03").getTime(), 20],
          // Add more data points as needed
        ],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
