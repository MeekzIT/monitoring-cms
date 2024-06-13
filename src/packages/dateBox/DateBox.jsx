import { Box, Button, Typography } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import LocalAtmIcon from "@mui/icons-material/LocalAtm"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import PaymentIcon from "@mui/icons-material/Payment"
import dayjs from "dayjs"

import DonutChart from "../../components/graphics/Dount"
import LineChart from "../../components/graphics/LineChart"
import { themePallete } from "../.."

const DeteBox = ({
	dountDate,
	dountDate2,
	selectedDate,
	openStatistics,
	info,
	linear,
	countryId,
	setOpenStatistics,
	handleDountDateChange,
	handleDountDateChange2,
	handleDateChange,
}) => {
	return (
		<div className='grapsBox'>
			<div className='grap'>
				<div className='grapsBox'>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								label='start'
								format='YYYY-MM-DD'
								value={dountDate}
								onChange={date =>
									handleDountDateChange(dayjs(date).format("YYYY-MM-DD"))
								}
								sx={{ width: "250px" }}
							/>
						</DemoContainer>
					</LocalizationProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								label='end'
								value={dountDate2}
								format='YYYY-MM-DD'
								onChange={date =>
									handleDountDateChange2(dayjs(date).format("YYYY-MM-DD"))
								}
								sx={{ width: "250px" }}
							/>
						</DemoContainer>
					</LocalizationProvider>
					{(dountDate || dountDate2) && (
						<Button
							onClick={() => {
								handleDountDateChange(null)
								handleDountDateChange2(null)
							}}
						>
							clear filtres
						</Button>
					)}
				</div>
				{info !== null && (
					<>
						<DonutChart
							benefit={info.ratio ? 100 - info?.ratio : 100}
							expenses={info?.ratio ? info.ratio : 0}
							expensesValue={info?.expense}
							benefitValue={info?.benefit}
							countryId={countryId}
							openStatistics={openStatistics}
							setOpenStatistics={setOpenStatistics}
							singleId={null}
							title={"статистика всех местоположений"}
							show={true}
						/>
						<div>
							<hr />
							<Typography
								className='coint-show-heading'
								sx={{ color: themePallete }}
							>
								{" "}
								<MonetizationOnIcon sx={{ color: themePallete }} />
								<div> Coin - {info?.coin}</div>
							</Typography>
							<hr />
							<Typography
								className='coint-show-heading'
								sx={{ color: themePallete }}
							>
								{" "}
								<LocalAtmIcon sx={{ color: themePallete }} />
								<div> Bill - {info?.cash}</div>
							</Typography>
							<hr />
							<Typography
								className='coint-show-heading'
								sx={{ color: themePallete }}
							>
								<PaymentIcon sx={{ color: themePallete }} />
								<div> Cash Less - {info?.bill}</div>
							</Typography>
							<hr />
						</div>
					</>
				)}
			</div>
			<Box className='grap'>
				{selectedDate && (
					<Button onClick={handleDateChange}>clear filtres</Button>
				)}
				{linear && (
					<LineChart
						benefit={linear?.map(i => {
							return i.result
						})}
						expense={linear?.map(i => {
							return i.caxs
						})}
						all={linear?.map(i => {
							return i.all
						})}
						mont={selectedDate}
						startDate={dountDate}
						endDate={dountDate2}
					/>
				)}
			</Box>
		</div>
	)
}

export default DeteBox
