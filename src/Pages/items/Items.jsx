import CircleIcon from "@mui/icons-material/Circle"
import EditIcon from "@mui/icons-material/Edit"
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
import GenerateModal from "../../components/generateModal/GenerateModal"
import GoBack from "../../components/goBack/GoBack"
import { compareWithUTC } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import {
	changeName,
	getBoxLinear,
	getBoxes,
	getSingleBoxInfo,
	getSingleOwners,
	getSingleUser,
	singleOwner,
} from "../../store/actions/users-action"
import BoxName from "./components/NameModal"
import Statistics from "../Boxes/Statistics"
import DeteBox from "../../packages/dateBox/DateBox"
import { useMemo } from "react"

const Items = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { id, owner_id, user_id } = useParams()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const location = useLocation()
	const user = useSelector(state => state.user.single)
	const owner = useSelector(state => state.user.singleOwner)
	const items = useSelector(state => state.user.items)
	const singleBoxInfo = useSelector(state => state.user.singleBoxInfo)
	const boxLinear = useSelector(state => state.user.boxLinear)
	const [openStatistics, setOpenStatistics] = useState(false)
	const [expand, setExpand] = useState(false)
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()
	const [openGenerate, setOpenGenerate] = useState(false)
	const [current, setCurrent] = useState(null)
	const [name, setName] = useState("")
	const [openName, setOpenName] = useState(false)

	const handleNested = id => {
		if (typeof expand == "boolean") {
			setExpand(id)
		} else setExpand(false)
	}

	const handleNavigate = (p2, p0) => {
		navigate(`/owner/${owner_id}/item/${id}/${p2}/${p0}`)
	}

	const handleFilter = () => {
		dispatch(
			getSingleBoxInfo({
				ownerId: owner_id,
				boxId: id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		if (!dountDate || !dountDate2) {
			dispatch(
				getBoxLinear({
					ownerId: owner_id,
					date: selectedDate,
					boxId: id,
				})
			)
		} else {
			dispatch(
				getBoxLinear({
					ownerId: owner_id,
					date: dountDate,
					endDate: dountDate2,
					boxId: id,
				})
			)
		}
	}
	useEffect(() => {
		dispatch(
			getSingleBoxInfo({
				ownerId: owner_id,
				boxId: id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		dispatch(
			getBoxLinear({
				ownerId: owner_id,
				date: dountDate,
				endDate: dountDate2,
				boxId: id,
			})
		)
		dispatch(getSingleUser(user_id))
		dispatch(getBoxes(owner_id, id))
	}, [dispatch, owner_id, id, user_id])

	useEffect(() => {
		dispatch(singleOwner(user_id))
		dispatch(getSingleOwners(id))
	}, [dispatch, id, user, user_id])

	const dateBox = useMemo(() => {
		return (
			<DeteBox
				dountDate={dountDate}
				dountDate2={dountDate2}
				selectedDate={selectedDate}
				openStatistics={openStatistics}
				info={singleBoxInfo}
				linear={boxLinear}
				handleFilter={handleFilter}
				countryId={user?.countryId}
				setOpenStatistics={setOpenStatistics}
				handleDountDateChange={handleDountDateChange}
				handleDountDateChange2={handleDountDateChange2}
				handleDateChange={handleDateChange}
			/>
		)
	}, [singleBoxInfo, boxLinear])
	return (
		<div>
			<Box m={2}>
				<GoBack prevPath={location.pathname} />
			</Box>
			<hr />
			{dateBox()}
			<hr />
			<div>
				<Box m={2}>
					<Button
						variant='contained'
						sx={{ color: "white" }}
						onClick={() => setOpenGenerate(true)}
					>
						{t("Generate")}
					</Button>
				</Box>
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
												align='left'
												onClick={() =>
													isMobile && handleNavigate(row.p2, row.p0)
												}
											>
												{row.datatime && compareWithUTC(row.datatime) ? (
													<span className='online'>
														<CircleIcon />
													</span>
												) : (
													<span className='offline'>
														<CircleIcon />
													</span>
												)}
												{t("name")} - {row.name}
											</TableCell>
											{!isMobile && (
												<TableCell align='left'>
													<Button
														variant='contained'
														onClick={() => {
															navigate(
																`/owner/${owner_id}/item/${id}/${row.p2}/${row.p0}`
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
											<TableCell
												onClick={() =>
													isMobile && handleNavigate(row.p2, row.p0)
												}
												align='left'
											>
												ID-{row.p2}
											</TableCell>
											<TableCell align='left'>
												<Button
													variant='contained'
													onClick={() => {
														setCurrent(row.p2)
														setName(row.name)
														setOpenName(true)
													}}
												>
													{isMobile ? <EditIcon /> : t("edit")}
												</Button>
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
			<BoxName
				open={openName}
				name={name}
				setName={setName}
				handleClose={() => {
					setOpenName(false)
				}}
				handleAddName={() => {
					dispatch(changeName({ name, ownerId: current }))
					dispatch(getBoxes(owner_id, id))
					setName("")
					setOpenName(false)
				}}
			/>
			<GenerateModal
				open={openGenerate}
				setOpen={setOpenGenerate}
				ownerId={owner_id}
			/>
		</div>
	)
}

export default Items
