import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../../hooks/useScreenType";

const LineChart = ({ benefit, expense, all, mont }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  function getDaysInGivenMonth(givenMonth) {
    console.log(
      givenMonth,
      "1111111111111111111111111111111111111111111111111111111111111111111"
    );
    // Use the current date if givenMonth is undefined
    const currentDate = givenMonth
      ? new Date(new Date().getFullYear(), parseInt(givenMonth, 10), 1)
      : new Date();

    // Get the year and month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month, 0);

    // Generate an array of strings in the format "DD Mon" for each day in the month
    const daysAndMonthsArray = [];
    // const monthNames = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const formattedDate = `${(day < 10 ? "0" : "") + day.toString()}`;
      daysAndMonthsArray.push(formattedDate);
    }

    return daysAndMonthsArray;
  }

  const days = useMemo(() => {
    return mont !== undefined
      ? getDaysInGivenMonth(11)
      : getDaysInGivenMonth(11);
  }, [mont]);
  console.log(mont?.slice(5, 8), days, "montmontmontmontmontmontmont");

  const chartData = {
    series: [
      {
        name: "benefit",
        data: benefit,
      },
      {
        name: "expense",
        data: expense,
      },
      {
        name: "all",
        data: all,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "Page Statistics",
        align: "left",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: days,
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width={isMobile ? "300" : "500"}
      />
    </div>
  );
};

export default LineChart;
