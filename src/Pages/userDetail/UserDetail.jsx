import AddIcon from "@mui/icons-material/Add"
import AddCardIcon from "@mui/icons-material/AddCard"
import { Box, Button, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { themePallete } from "../.."
import GoBack from "../../components/goBack/GoBack"
import ResetModal from "../../components/resetModal/ResetModal"
import { getCurrency } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import { getCountries } from "../../store/actions/statistics-action"
import {
	deleteOwner,
	getOwnerSystem,
	getSingleOwners,
	getSingleUser,
} from "../../store/actions/users-action"
import AddOwner from "./AddModal"
import EditUser from "./EditUser"
import OwnerSystemModal from "./OwnerSystemModal"
import DeleteModal from "../../packages/Modals/DeleteModal"
import DataTable from "../../packages/Table/DataTable"

const UserDetail = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()

	const [loading, setLoading] = useState(true)
	const [openReset, setOpenReset] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openSystem, setOpenSystem] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [currint, setCurrent] = useState()
	const [open, setOpen] = useState(false)

	const data = useSelector(state => state.user.single)
	const isSuper = useSelector(state => state.auth.isSuper)
	const singleData = useSelector(state => state.user.owner)
	const countries = useSelector(state => state.statistics.countries)
	const ownerActives = useSelector(state => state.user.ownerStatistics)
	const ownerSystem = useSelector(state => state.user.ownerSystem)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const handleNavigate = (id, deviceOwner) => {
		isMobile && dispatch(getSingleOwners(id))
		isMobile && navigate(`/user/${id}/owner/${deviceOwner}`)
	}

	useEffect(() => {
		dispatch(getCountries())
		dispatch(getSingleUser(id))
		setLoading(false)
	}, [dispatch, id])

	const cells = [
		{ id: 1, name: "name", show: true },
		{ id: 2, name: null, show: !isMobile },
		{ id: 3, name: "email", show: !isMobile },
		{ id: 4, name: "country", show: !isMobile },
		{ id: 5, name: "active", show: !isMobile },
		{ id: 6, name: "Owner Device ID", show: !isMobile },
		{ id: 7, name: "lastPay", show: isMobile },
		{
			id: 8,
			name: (
				<>
					{t("active")}
					{` / `}
					{t("lastPay")}
				</>
			),
			show: true,
		},
		{ id: 9, name: "Add Payment", show: isSuper === "superAdmin" },
	]

	const columns = [
		{
			id: 1,
			name: row => {
				return (
					<>
						{row.firstName} {row.lastName}
						{isMobile && `/ Owner Device ID -  ${row?.deviceOwner}`}
					</>
				)
			},
			show: true,
			action: true,
			fn: row => {
				isMobile && handleNavigate(row.id, row?.deviceOwner)
			},
		},
		{
			id: 2,
			name: null,
			action: true,
			show: !isMobile,
			fn: row => {
				dispatch(getSingleOwners(row.id))
				navigate(`/user/${id}/owner/${row?.deviceOwner}`)
			},
		},
		{
			id: 3,
			name: row => {
				return <>{row.email}</>
			},
			show: !isMobile,
			action: false,
		},
		{
			id: 4,
			name: row => {
				return <>{row.Country.name}</>
			},
			show: true,
			action: true,
			fn: row => {
				isMobile && handleNavigate(row.id, row?.deviceOwner)
			},
		},
		{
			id: 5,
			name: row => {
				return (
					<>
						{row.subscribe ? (
							<span
								style={{
									color: "green",
								}}
							>
								{t("subscribe")}
							</span>
						) : (
							<span
								style={{
									color: "red",
								}}
							>
								{t("pasive")}
							</span>
						)}

						{isMobile && (
							<>
								{"   "}
								{row.lastPay ? row.lastPay : "-"} -{" "}
								{row?.variant?.toUpperCase()} {getCurrency(row?.countryId)}
							</>
						)}
					</>
				)
			},
			show: true,
			action: true,
			fn: row => {
				handleNavigate(row.id, row?.deviceOwner)
			},
		},
		{
			id: 6,
			name: row => {
				return <>{row?.deviceOwner}</>
			},
			show: !isMobile,
			action: true,
			fn: row => {
				isMobile && handleNavigate(row.id, row?.deviceOwner)
			},
		},
		{
			id: 7,
			name: row => {
				return (
					<>
						{row.lastPay ? row.lastPay : "-"} / {row?.variant?.toUpperCase()}{" "}
						{getCurrency(row?.countryId)}
					</>
				)
			},
			show: !isMobile,
			action: true,
			fn: row => {
				isMobile && handleNavigate(row.id, row?.deviceOwner)
			},
		},
		{
			id: 8,
			name: row => {
				return (
					<>
						<Button
							variant='outlined'
							onClick={() => {
								dispatch(getOwnerSystem(row.id))
								setOpenSystem(true)
							}}
						>
							<AddCardIcon />
						</Button>
					</>
				)
			},
			show: isSuper === "superAdmin",
			action: true,
			fn: row => {
				dispatch(getOwnerSystem(row.id))
				setOpenSystem(true)
			},
		},
	]

	return (
		<div>
			<Box m={3}>
				<GoBack prevPath={location.pathname} />
			</Box>
			<Box>
				{loading ? (
					<div className='loading-box'>
						<CircularProgress
							sx={{
								color: themePallete,
							}}
						/>
					</div>
				) : (
					<Box m={3}>
						<Box>
							<h1>
								{data?.firstName} {data?.lastName}
							</h1>
							<h4>{data?.email}</h4>
						</Box>
						<hr />

						<Box>
							<Box mb={2}>
								<h1>{t("owners")}</h1>
								<h4 style={{ color: "green" }}>
									{t("active")} - {ownerActives?.active?.length}
								</h4>
								<h4 style={{ color: "red" }}>
									{t("pasive")} - {ownerActives?.pasiveve?.length}
								</h4>
								<Button variant='contained' onClick={handleOpen}>
									<AddIcon
										sx={{
											color: "white",
										}}
									/>
								</Button>
							</Box>
							<DataTable
								cells={cells}
								data={data?.Owners}
								columns={columns}
								setCurrrent={setCurrent}
								handleEdit={row => {
									dispatch(getSingleOwners(row.id))
									setOpenEdit(true)
								}}
								handleDelete={row => {
									setCurrent(row.id)
									setOpenDel(true)
								}}
								isDeleting
								isEditing
							/>
						</Box>
					</Box>
				)}
			</Box>
			<DeleteModal
				open={openDel}
				handleClose={() => {
					setOpenDel(false)
				}}
				handleDelete={() => {
					dispatch(deleteOwner(currint))
					setOpenDel(false)
				}}
			/>
			<AddOwner open={open} handleClose={handleClose} />
			<ResetModal
				open={openReset}
				handleClose={() => setOpenReset(false)}
				role='owner'
				currint={currint}
			/>
			{singleData && (
				<EditUser
					open={openEdit}
					handleClose={() => setOpenEdit(false)}
					countries={countries}
					data={singleData}
				/>
			)}
			{ownerSystem && (
				<OwnerSystemModal
					open={openSystem}
					handleClose={() => setOpenSystem(false)}
					data={ownerSystem}
				/>
			)}
		</div>
	)
}

export default UserDetail
