import AddIcon from "@mui/icons-material/Add"
import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { makeArray } from "../../hooks/makeArray"
import { useIsMobile } from "../../hooks/useScreenType"
import { getMe } from "../../store/actions/auth-action"
import { getCountries } from "../../store/actions/statistics-action"
import {
	anulateUser,
	destroyUsers,
	getSingleUser,
	getUsers,
} from "../../store/actions/users-action"
import AddUser from "./AddUser"
import EditUser from "./EditUser"
import DeleteModal from "../../packages/Modals/DeleteModal"
import Pagination from "../../packages/Pagination/Pagination"
import DataTable from "../../packages/Table/DataTable"

const UserPage = () => {
	const { t } = useTranslation()
	const isMobile = useIsMobile()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [current, setCurrrent] = useState(null)
	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [page, setPage] = useState(0)
	const [pages, setPages] = useState([])

	const data = useSelector(state => state.user.users)
	const count = useSelector(state => state.user.count)
	const countries = useSelector(state => state.statistics.countries)
	const user = useSelector(state => state.auth.admin)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	useEffect(() => {
		if (count) {
			setPages(makeArray(Math.ceil(count / 12)))
		}
	}, [count])

	useEffect(() => {
		dispatch(getCountries())
		dispatch(getMe())
	}, [dispatch])

	useEffect(() => {
		user && dispatch(getUsers(page))
	}, [dispatch, page, user])

	const cells = [
		{ id: 1, name: "name", show: true },
		{ id: 2, name: null, show: true },
		{ id: 3, name: "email", show: !isMobile },
		{ id: 4, name: "country", show: !isMobile },
	]

	const columns = [
		{
			id: 1,
			name: row => {
				return (
					<>
						{row.firstName} {row.lastName}
					</>
				)
			},
			show: true,
			action: true,
			fn: row => {
				isMobile && navigate(`/user/${row.id}`)
			},
		},
		{
			id: 2,
			name: null,
			action: true,
			show: !isMobile,
			fn: row => {
				navigate(`/user/${row.id}`)
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
				isMobile && navigate(`/user/${row.id}`)
			},
		},
	]

	return (
		<Box m={3}>
			<Box mb={2}>
				<h1>{t("users")}</h1>
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
				data={data}
				columns={columns}
				setCurrrent={setCurrrent}
				handleEdit={row => {
					setCurrrent(row.id)
					dispatch(getSingleUser(row.id))
					setOpenEdit(true)
				}}
				handleDelete={row => {
					setCurrrent(row.id)
					setOpenDel(true)
				}}
				isDeleting
				isEditing
			/>
			<Pagination pages={pages} page={page} setPage={setPage} />
			<DeleteModal
				open={openDel}
				handleClose={() => setOpenDel(false)}
				handleDelete={() => {
					dispatch(destroyUsers({ id: current }))
					dispatch(getUsers(page))
					dispatch(anulateUser())
					setOpenDel(false)
				}}
			/>
			<AddUser open={open} handleClose={handleClose} countries={countries} />
			{current && (
				<EditUser
					open={openEdit}
					handleClose={() => {
						dispatch(anulateUser())
						setOpenEdit(false)
					}}
					countries={countries}
				/>
			)}
		</Box>
	)
}

export default UserPage
