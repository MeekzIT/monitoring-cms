import Chart from "react-apexcharts";

import React from "react";
import { useIsMobile } from "../../hooks/useScreenType";
import { getCurrency } from "../../hooks/helpers";
import { Box, Typography } from "@mui/material";
// import { Doughnut } from "react-chartjs-2";
import CircleIcon from "@mui/icons-material/Circle";

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
  show,
}) => {
  const isMobile = useIsMobile();
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
        `Benefit ${benefitValue} ${
          show !== false ? getCurrency(countryId) : ""
        }`,
        `Expenses ${expensesValue} ${
          show !== false ? getCurrency(countryId) : ""
        }`,
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
            },
          },
        },
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
    dataLabels: {
      enabled: true,
    },
    series: [benefit, expenses],
    // colors: ["red", "#ff6384", "#36a2eb"],
  };
  console.log(benefit, expenses, "countryIdcountryIdcountryIdcountryId");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        // position: "relative",
        // justifyContent: "space-between",
      }}
    >
      {name && (
        <Typography variant="h6" component="h2">
          {name} {expensesValue + benefitValue}{" "}
          {show !== false ? getCurrency(countryId) : ""}
        </Typography>
      )}

      <div
        sx={{
          position: "absolute",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            right: "-61%",
            top: "29px",
          }}
        >
          <CircleIcon sx={{ color: "red", fontSize: "16px" }} />
          <Typography variant="h6" component="h2">
            All {benefitValue + expensesValue}
            {show !== false ? getCurrency(countryId) : ""}
          </Typography>
        </div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width={isMobile ? "300" : "500"}
        />
      </div>
    </Box>
  );
};

export default DonutChart;
