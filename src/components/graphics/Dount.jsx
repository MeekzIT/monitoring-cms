import StackedLineChartIcon from "@mui/icons-material/StackedLineChart"
import { Box, Button, Typography } from "@mui/material"
import React from "react"
import Chart from "react-apexcharts"
import { getCurrency, getPrice } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
// import { Doughnut } from "react-chartjs-2";
import CircleIcon from "@mui/icons-material/Circle"
import { useTranslation } from "react-i18next"

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
	title,
}) => {
	const isMobile = useIsMobile()
	const { t } = useTranslation()
	const handleClick = () => {
		!isMobile && setOpenStatistics(!openStatistics)
	}

	const handleSingle = () => {
		// Access information about the clicked segment
		setSingle(singleId)
	}
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
				`${t("expenses")} ${expensesValue ? getPrice(countryId, expensesValue) : 0} ${show !== false ? getCurrency(countryId) : ""}`,
                		`${t("benefit")} ${getPrice(countryId, benefitValue)} ${show !== false ? getCurrency(countryId) : ""}`,
                		`${t("all")} ${getPrice(countryId, benefitValue + expensesValue)} ${show !== false ? getCurrency(countryId) : ""}`,
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
			tooltip: {
				enabled: false, // Set this to false to disable tooltips
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
		series: [expenses, benefit],
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			{name && (
				<Typography variant='h6' component='h2'>
					{name}
				</Typography>
			)}

			<div
				sx={{
					position: "absolute",
				}}
				className='apexcharts-legend apexcharts-align-center apx-legend-position-right'
			>
				{/* <div
					style={{
						display: "flex",
						alignItems: "center",
						position: "relative",
					}}
					className='apexcharts-legend-series'
				>
					<CircleIcon sx={{ color: "rgb(254, 176, 25)", fontSize: "16px" }} />
					<Typography variant='h6' component='h2'>
						{t("all")} {benefitValue + expensesValue}
						{show !== false ? getCurrency(countryId) : ""}
					</Typography>
				</div> */}
				{title && isMobile && (
					<div>
						<Button
							sx={{
								margin: "10px 0 ",
							}}
							variant='outlined'
							fullWidth
							onClick={() => setOpenStatistics(!openStatistics)}
							endIcon={<StackedLineChartIcon />}
						>
							{title}
						</Button>
					</div>
				)}
			</div>
			{chartData?.options && chartData?.series && (
				<Chart
					options={chartData?.options}
					series={chartData?.series}
					type='donut'
					width={isMobile ? "300" : "500"}
				/>
			)}
		</Box>
	)
}

export default DonutChart
