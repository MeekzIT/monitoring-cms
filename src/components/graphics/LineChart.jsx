import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../../hooks/useScreenType";

const LineChart = ({ benefit, expense, all, mont, startDate, endDate }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  function getDaysInGivenMonth(givenMonth) {
    const currentDate = givenMonth
      ? new Date(new Date().getFullYear(), parseInt(givenMonth, 10), 1)
      : new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const lastDayOfMonth = new Date(year, month, 0);

    const daysAndMonthsArray = [];
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const formattedDate = `${(day < 10 ? "0" : "") + day.toString()}`;
      daysAndMonthsArray.push(formattedDate);
    }

    return daysAndMonthsArray;
  }

  function getDatesInRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    const finalDate = endDate ? new Date(endDate) : new Date();

    while (currentDate <= finalDate) {
      dateArray.push(currentDate.toISOString().slice(8, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }
  const days = useMemo(() => {
    return mont !== undefined
      ? getDaysInGivenMonth(11)
      : getDaysInGivenMonth(11);
  }, [mont]);
  const showDates = getDatesInRange(startDate, endDate);
  const chartData = {
    series: [
      {
        name: t("benefit"),
        data: benefit,
      },
      {
        name: t("expenses"),
        data: expense,
      },
      {
        name: t("all"),
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
      xaxis: {
        categories: showDates.length ? showDates : days,
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
      { chartData?.options && chartData?.series &&  <Chart
        options={chartData?.options}
        series={chartData?.series}
        type="line"
        width={isMobile ? "300" : "500"}
      />}
     
    </div>
  );
};

export default LineChart;
