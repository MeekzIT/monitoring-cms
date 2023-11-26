import Chart from "react-apexcharts";

import React from "react";
import { useIsMobile } from "../../hooks/useScreenType";
import { getCurrency } from "../../hooks/helpers";
import { Box, Typography } from "@mui/material";
// import { Doughnut } from "react-chartjs-2";

const DonutChart = ({
  benefit,
  expenses,
  expensesValue,
  benefitValue,
  countryId,
  openStatistics,
  setOpenStatistics,
  name,
  singleId,
  setSingle,
}) => {
  const isMobile = useIsMobile();
  console.log(singleId, ":lllllllllll");
  const handleClick = () => {
    // Access information about the clicked segment
    setOpenStatistics(!openStatistics);
  };

  const handleSingle = () => {
    // Access information about the clicked segment
    setSingle(singleId);
  };
  const chartData = {
    options: {
      chart: {
        events: {
          click:
            openStatistics !== null
              ? handleClick
              : singleId !== null
              ? handleSingle
              : null,
        },
      },
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        // justifyContent: "space-between",
      }}
    >
      {name && (
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
      )}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={isMobile ? "300" : "500"}
      />
    </Box>
  );
};

export default DonutChart;
