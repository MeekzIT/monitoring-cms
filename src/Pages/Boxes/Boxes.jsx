import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import GoBack from "../../components/goBack/GoBack"
import { useIsMobile } from "../../hooks/useScreenType"
import { deleteBox, getBoxExpenses } from "../../store/actions/box"
import {
	getBoxInfo,
	getBoxLinear,
	getBoxes,
	getBoxesInfo,
	getItemInfoBenefits,
	getSingleBox,
	getSingleOwners,
	getSingleUser,
	singleOwner,
} from "../../store/actions/users-action"
import DeleteModal from "../../packages/Modals/DeleteModal"
import EditBox from "./EditModal"
import AddBox from "./AddModal"
import OtherSeetings from "./OtherSettings"
import Statistics from "./Statistics"
import DataTable from "../../packages/Table/DataTable"
import { useEffect, useState, useMemo } from "react"
import DeteBox from "../../packages/dateBox/DateBox"

const Boxes = () => {
	const { id, user_id, owner: ownerParam } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const location = useLocation()

	const [open, setOpen] = useState(false)
	const [openStatistics, setOpenStatistics] = useState(false)
	const [openSettings, setOpenSettings] = useState(false)
	const [currentId, setCurrentId] = useState(null)
	const [currentOwner, setCurrentOwner] = useState(null)
	const [name, setName] = useState(null)
	const [openDel, setOpenDel] = useState(false)
	const [geo, setGeo] = useState(null)
	const [addField, setAddField] = useState(false)
	const [addedFieldValueName, setAddedFieldValueName] = useState("")
	const [addedFieldValuePrice, setAddedFieldValuePrice] = useState("")
	const [nameExpenses, setNameExpenses] = useState("")
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()
	const [price, setPrice] = useState("")
	const [single, setSingle] = useState(null)
	const [showRows, setShowRows] = useState(false)
	const [info, setInfo] = useState(null)
	const [openAdd, setOpenAdd] = useState(false)
	const [expand, setExpand] = useState(false)
	const [filter, setFilter] = useState(false)

	const user = useSelector(state => state.user.single)
	const owner = useSelector(state => state.user.owner)
	const data = useSelector(state => state.user.boxes)
	const boxInfo = useSelector(state => state.user.boxInfo)
	const boxesInfo = useSelector(state => state.user.boxesInfo)
	const boxExpernses = useSelector(state => state.user.boxExpernses)
	const boxLinear = useSelector(state => state.user.boxLinear)

	const handleNested = id => {
		if (typeof expand == "boolean") {
			setExpand(id)
		} else setExpand(false)
	}

	const handleNavigate = (rowId, ownerId) => {
		dispatch(getSingleBox(rowId))
		dispatch(getBoxes(id, rowId))
		navigate(`/user/${user_id}/owner/${ownerId}/item/${rowId}`)
	}

	const handleFilter = () => {
		dispatch(
			getBoxesInfo({
				ownerId: id,
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
			getBoxesInfo({
				ownerId: id,
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
		dispatch(getSingleUser(user_id))
		dispatch(getBoxes(id))
		dispatch(
			getBoxInfo({
				ownerId: id,
			})
		)
		dispatch(
			getBoxesInfo({
				ownerId: id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		dispatch(
			getBoxLinear({
				ownerId: id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
	}, [selectedDate, dountDate, dountDate2])

	useEffect(() => {
		dispatch(getSingleUser(user_id))
		dispatch(singleOwner(user_id))
		user && dispatch(getSingleOwners(user_id))
		let items = []
		data
			?.filter(i => i.ownerId == currentId)[0]
			?.Items?.map(y => items.push(y.p2))
		items.length && dispatch(getItemInfoBenefits(JSON.stringify(items)))
	}, [])

	useEffect(() => {
		single !== null && setInfo(boxesInfo?.filter(i => i.box.id == single)[0])
		single !== null && setShowRows(true)
	}, [single])

	const cells = [
		{ id: 1, name: "name", show: true },
		{ id: 2, name: "MoikaID", show: !isMobile },
		{ id: 3, name: <>"MoikaID / {t("geolocation")}"</>, show: isMobile },
		{ id: 4, name: null, show: true },
		{ id: 5, name: "geolocation", show: !isMobile },
		{ id: 6, name: "difrentExspenses", show: true },
	]

	const columns = [
		{
			id: 1,
			name: row => {
				return <>{row.name}</>
			},
			show: true,
			action: true,
			fn: row => {
				dispatch(getSingleBox(row.id))
				dispatch(getBoxes(id, row.id))
				isMobile && handleNavigate(row.id, row?.ownerId)
			},
		},
		{
			id: 2,
			name: row => {
				return <>{row.id}</>
			},
			show: !isMobile,
			action: false,
		},
		{
			id: 3,
			name: row => {
				return (
					<>
						<bold>{row.id}</bold> / {row.geolocation}
					</>
				)
			},
			show: isMobile,
			action: true,
			fn: row => {
				dispatch(getSingleBox(row.id))
				dispatch(getBoxes(id, row.id))
				isMobile && handleNavigate(row.id, row?.ownerId)
			},
		},
		{
			id: 4,
			name: null,
			action: true,
			show: !isMobile,
			fn: row => {
				dispatch(getSingleBox(row.id))
				dispatch(getBoxes(id, row.id))
				handleNavigate(row.id, row?.ownerId)
			},
		},
		{
			id: 5,
			name: row => {
				return <>{row.geolocation}</>
			},
			show: true,
			action: false,
		},
		{
			id: 6,
			name: row => {
				return (
					<>
						{" "}
						<Button
							variant='outlined'
							onClick={() => {
								setCurrentId(row.id)
								setCurrentOwner(row.ownerId)
								dispatch(
									getBoxExpenses({
										boxId: row.id,
										ownerId: row.ownerId,
									})
								)
								setOpenSettings(true)
							}}
						>
							<SettingsSuggestIcon />
						</Button>
					</>
				)
			},
			show: true,
			action: false,
		},
	]

	console.log({ boxInfo })
	const dateBox = useMemo(() => {
		return (
			<DeteBox
				dountDate={dountDate}
				dountDate2={dountDate2}
				selectedDate={selectedDate}
				openStatistics={openStatistics}
				info={boxInfo}
				filter={filter}
				handleFilter={handleFilter}
				handleClearFilter={handleClearFilter}
				linear={boxLinear}
				countryId={user?.countryId}
				setOpenStatistics={setOpenStatistics}
				handleDountDateChange={handleDountDateChange}
				handleDountDateChange2={handleDountDateChange2}
				handleDateChange={handleDateChange}
			/>
		)
	}, [
		boxInfo,
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
			<Box m={3}>
				<GoBack prevPath={location.pathname} />
			</Box>

			<Box m={3}>
				<Box>
					<h1>
						{owner?.firstName} {owner?.lastName}
					</h1>
					<h4>{owner?.email}</h4>
				</Box>
				<hr />
				{dateBox}
				<hr />
				<Box
					sx={{
						display: "flex",
						gap: "10px",
					}}
				>
					<Button
						variant='contained'
						sx={{ color: "white" }}
						onClick={() => setOpenAdd(true)}
					>
						{t("add-object")}
					</Button>
				</Box>

				<hr />
				<DataTable
					cells={cells}
					data={data}
					columns={columns}
					setCurrrent={setCurrentId}
					handleEdit={row => {
						setName(row.name)
						setGeo(row.geolocation)
						setCurrentId(row.id)
						setOpen(true)
					}}
					handleDelete={row => {
						setOpenDel(true)
						setCurrentId(row.id)
					}}
					isDeleting
					isEditing
				/>
			</Box>

			<DeleteModal
				open={openDel}
				handleClose={() => {
					setOpenDel(false)
				}}
				handleDelete={() => {
					dispatch(deleteBox({ id: currentId }))
					dispatch(getBoxes(id))
					setOpenDel(false)
				}}
			/>

			<EditBox
				open={open}
				handleClose={() => {
					setOpen(false)
					setGeo("")
					setName("")
				}}
				currentId={user?.countryId}
				setGeo={setGeo}
				setName={setName}
				name={name}
				geo={geo}
			/>

			<AddBox
				open={openAdd}
				handleClose={() => setOpenAdd(false)}
				setGeo={setGeo}
				setName={setName}
				name={name}
				geo={geo}
			/>

			<OtherSeetings
				open={openSettings}
				handleClose={() => {
					setOpenSettings(false)
				}}
				setAddField={setAddField}
				addField={addField}
				addedFieldValueName={addedFieldValueName}
				setAddedFieldValueName={setAddedFieldValueName}
				addedFieldValuePrice={addedFieldValuePrice}
				setAddedFieldValuePrice={setAddedFieldValuePrice}
				currentId={user?.countryId}
				currentOwner={currentOwner}
				boxExpernses={boxExpernses}
				setNameExpenses={setNameExpenses}
				setPrice={setPrice}
				nameExpenses={nameExpenses}
				price={price}
			/>
			<Statistics
				open={openStatistics}
				handleClose={() => {
					setOpenStatistics(false)
				}}
				countryId={user?.countryId}
				setShowRows={setShowRows}
				setInfo={setInfo}
				setSingle={setSingle}
				showRows={showRows}
				result={info?.allResult}
				expand={expand}
				boxesInfo={boxesInfo}
				handleNested={handleNested}
			/>
		</div>
	)
}

export default Boxes
