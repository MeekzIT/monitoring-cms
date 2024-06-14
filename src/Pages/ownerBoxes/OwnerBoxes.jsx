import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoBack from "../../components/goBack/GoBack"
import { useIsMobile } from "../../hooks/useScreenType"
import { getMe } from "../../store/actions/auth-action"
import { deleteBox, getBoxExpenses } from "../../store/actions/box"
import {
	getBoxInfo,
	getBoxLinear,
	getBoxes,
	getBoxesInfo,
	getSingleBox,
} from "../../store/actions/users-action"
import EditBox from "../Boxes/EditModal"
import DeleteModal from "../../packages/Modals/DeleteModal"
import AddBox from "../Boxes/AddModal"
import Statistics from "../Boxes/Statistics"
import OtherSeetings from "../Boxes/OtherSettings"
import DataTable from "../../packages/Table/DataTable"
import DeteBox from "../../packages/dateBox/DateBox"

const OwnerBoxes = () => {
	const { t } = useTranslation()
	const isMobile = useIsMobile()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const owner = useSelector(state => state.auth.admin)
	const data = useSelector(state => state.user.boxes)
	const boxInfo = useSelector(state => state.user.boxInfo)
	const boxesInfo = useSelector(state => state.user.boxesInfo)
	const boxExpernses = useSelector(state => state.user.boxExpernses)
	const boxLinear = useSelector(state => state.user.boxLinear)
	const [open, setOpen] = useState(false)
	const [addField, setAddField] = useState(false)
	const [addedFieldValueName, setAddedFieldValueName] = useState("")
	const [addedFieldValuePrice, setAddedFieldValuePrice] = useState("")
	const [nameExpenses, setNameExpenses] = useState("")
	const [price, setPrice] = useState("")
	const [openAdd, setOpenAdd] = useState(false)
	const [currentId, setCurrentId] = useState(null)
	const [currentOwner, setCurrentOwner] = useState(null)
	const [name, setName] = useState(null)
	const [openSettings, setOpenSettings] = useState(false)
	const [geo, setGeo] = useState(null)
	const [openStatistics, setOpenStatistics] = useState(false)
	const [single, setSingle] = useState(null)
	const [showRows, setShowRows] = useState(false)
	const [info, setInfo] = useState(null)
	const [expand, setExpand] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()

	const handleNested = id => {
		if (typeof expand == "boolean") {
			setExpand(id)
		} else setExpand(false)
	}
	useEffect(() => {
		dispatch(getMe())
	}, [])

	const handleFilter = () => {
		dispatch(
			getBoxesInfo({
				ownerId: owner?.deviceOwner,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		if (!dountDate || !dountDate2) {
			dispatch(
				getBoxLinear({
					ownerId: owner?.deviceOwner,
					date: selectedDate,
				})
			)
		} else {
			dispatch(
				getBoxLinear({
					ownerId: owner?.deviceOwner,
					date: dountDate,
					endDate: dountDate2,
				})
			)
		}
	}

	useEffect(() => {
		dispatch(getBoxes(owner?.deviceOwner))
		dispatch(
			getBoxInfo({
				ownerId: owner?.deviceOwner,
			})
		)
		dispatch(
			getBoxLinear({
				ownerId: owner?.deviceOwner,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		dispatch(
			getBoxesInfo({
				ownerId: owner?.deviceOwner,
				date: dountDate,
				endDate: dountDate2,
			})
		)
	}, [owner])

	const handleNavigate = rowId => {
		dispatch(getSingleBox(rowId))
		navigate(`/owner-items/${owner?.deviceOwner}/${rowId}`)
	}

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
				dispatch(getBoxes(owner?.deviceOwner, row.id))
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
				dispatch(getBoxes(owner?.deviceOwner, row.id))
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
				dispatch(getBoxes(owner?.deviceOwner, row.id))
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
				)
			},
			show: true,
			action: false,
		},
	]

	return (
		<div>
			<Box m={3}>
				<GoBack />
				<Box>
					<h1>
						{owner?.firstName} {owner?.lastName}
					</h1>
					<h4>{owner?.email}</h4>
				</Box>
				<hr />
				<DeteBox
					dountDate={dountDate}
					dountDate2={dountDate2}
					selectedDate={selectedDate}
					openStatistics={openStatistics}
					info={boxInfo}
					linear={boxLinear}
					countryId={owner?.countryId}
					handleFilter={handleFilter}
					setOpenStatistics={setOpenStatistics}
					handleDountDateChange={handleDountDateChange}
					handleDountDateChange2={handleDountDateChange2}
					handleDateChange={handleDateChange}
				/>
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

			<EditBox
				open={open}
				handleClose={() => {
					setOpen(false)
					setGeo("")
					setName("")
				}}
				currentId={currentId}
				setGeo={setGeo}
				setName={setName}
				name={name}
				geo={geo}
			/>

			<DeleteModal
				open={openDel}
				handleClose={() => {
					setOpenDel(false)
				}}
				handleDelete={() => {
					dispatch(deleteBox({ id: currentId }))
					dispatch(getBoxes(owner?.deviceOwner))
					setOpenDel(false)
				}}
			/>
			<AddBox
				open={openAdd}
				handleClose={() => setOpenAdd(false)}
				setGeo={setGeo}
				setName={setName}
				name={name}
				geo={geo}
			/>
			<Statistics
				open={openStatistics}
				handleClose={() => {
					setOpenStatistics(false)
				}}
				countryId={currentId}
				setShowRows={setShowRows}
				setInfo={setInfo}
				setSingle={setSingle}
				showRows={showRows}
				result={info?.allResult}
				expand={expand}
				boxesInfo={boxesInfo}
				handleNested={handleNested}
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
				currentId={currentId}
				currentOwner={currentOwner}
				boxExpernses={boxExpernses}
				setNameExpenses={setNameExpenses}
				setPrice={setPrice}
				nameExpenses={nameExpenses}
				price={price}
			/>
		</div>
	)
}

export default OwnerBoxes
