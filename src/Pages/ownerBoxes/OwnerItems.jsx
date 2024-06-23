import CircleIcon from "@mui/icons-material/Circle"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { Box, Button } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { themePallete } from "../.."
import GenerateModal from "../../components/generateModal/GenerateModal"
import GoBack from "../../components/goBack/GoBack"
import { compareWithUTC } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import {
	getBoxLinear,
	getBoxes,
	getSingleBoxInfo,
	getSingleOwners,
} from "../../store/actions/users-action"
import Statistics from "../Boxes/Statistics"
import DeteBox from "../../packages/dateBox/DateBox"
import { useMemo } from "react"

const Items = () => {
	const navigate = useNavigate()
	const { id, box_id } = useParams()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const user = useSelector(state => state.user.single)
	const owner = useSelector(state => state.user.owner)
	const items = useSelector(state => state.user.items)
	const boxLinear = useSelector(state => state.user.boxLinear)
	const location = useLocation()
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()
	const singleBoxInfo = useSelector(state => state.user.singleBoxInfo)
	const [openStatistics, setOpenStatistics] = useState(false)
	const [expand, setExpand] = useState(false)
	const [openGenerate, setOpenGenerate] = useState(false)
	const [filter, setFilter] = useState(false)

	const handleNested = id => {
		if (typeof expand == "boolean") {
			setExpand(id)
		} else setExpand(false)
	}

	const handleFilter = () => {
		dispatch(
			getSingleBoxInfo({
				ownerId: id,
				boxId: box_id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		if (!dountDate || !dountDate2) {
			dispatch(
				getBoxLinear({
					ownerId: id,
					date: selectedDate,
				})
			)
		} else {
			dispatch(
				getBoxLinear({
					ownerId: id,
					date: dountDate,
					endDate: dountDate2,
				})
			)
		}
		setFilter(true)
	}

	const handleClearFilter = () => {
		handleDountDateChange()
		handleDountDateChange2()
		dispatch(
			getSingleBoxInfo({
				ownerId: id,
				boxId: box_id,
			})
		)
		dispatch(
			getBoxLinear({
				ownerId: id,
			})
		)
		setFilter(false)
	}

	useEffect(() => {
		dispatch(getBoxes(id, box_id))
		user && dispatch(getSingleOwners(id))
	}, [user])

	const dateBox = useMemo(() => {
		return (
			<DeteBox
				dountDate={dountDate}
				dountDate2={dountDate2}
				selectedDate={selectedDate}
				openStatistics={openStatistics}
				info={singleBoxInfo}
				filter={filter}
				linear={boxLinear}
				countryId={owner?.countryId}
				handleFilter={handleFilter}
				handleClearFilter={handleClearFilter}
				setOpenStatistics={setOpenStatistics}
				handleDountDateChange={handleDountDateChange}
				handleDountDateChange2={handleDountDateChange2}
				handleDateChange={handleDateChange}
			/>
		)
	}, [
		singleBoxInfo,
		boxLinear,
		dountDate,
		dountDate2,
		handleFilter,
		handleDateChange,
		handleDountDateChange2,
		handleDountDateChange,
	])
	return (
		<div>
			<Box>
				<GoBack prevPath={location.pathname} />
			</Box>
			<hr />
			{dateBox}
			<hr />
			<div>
				<hr />
				<Box sx={{ overflow: "auto" }}>
					<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 300 }} aria-label='simple table'>
								<TableBody>
									{items?.map(row => (
										<TableRow
											key={row.name}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												onClick={() => {
													navigate(
														`/owner/${id}/item/${row.id}/${row.p2}/${row.p0}`
													)
												}}
												align='left'
											>
												ID-{row?.p2} {row?.name}
											</TableCell>
											{!isMobile && (
												<TableCell align='left'>
													<Button
														variant='contained'
														onClick={() => {
															navigate(
																`/owner/${id}/item/${row.id}/${row.p2}/${row.p0}`
															)
														}}
													>
														<RemoveRedEyeIcon
															sx={{
																color: "white",
															}}
														/>
													</Button>
												</TableCell>
											)}
											<TableCell align='left'>
												{row?.datatime && compareWithUTC(row?.datatime) ? (
													<span className='online'>
														<CircleIcon />
													</span>
												) : (
													<span className='offline'>
														<CircleIcon />
													</span>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
				<Statistics
					open={openStatistics}
					handleClose={() => {
						setOpenStatistics(false)
					}}
					countryId={user?.countryId}
					showRows={false}
					result={singleBoxInfo?.allResult}
					expand={expand}
					handleNested={handleNested}
				/>
			</div>
			<GenerateModal
				open={openGenerate}
				setOpen={setOpenGenerate}
				ownerId={id}
			/>
		</div>
	)
}

export default Items
