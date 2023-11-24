import Chart from "react-apexcharts";

import React from "react";
import { useIsMobile } from "../../hooks/useScreenType";
import { getCurrency } from "../../hooks/helpers";
// import { Doughnut } from "react-chartjs-2";

const DonutChart = ({
  benefit,
  expenses,
  expensesValue,
  benefitValue,
  countryId,
}) => {
  const isMobile = useIsMobile();
  const chartData = {
    options: {
      labels: [
        `Benefit ${benefitValue} ${getCurrency(countryId)}`,
        `Expenses ${expensesValue} ${getCurrency(countryId)}`,
      ],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [benefit, expenses],
    colors: ["#ff6384", "#36a2eb"],
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      width={isMobile ? "300" : "500"}
    />
  );
};

export default DonutChart;
