import { Box, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BOXES_PAGE } from "../../routing/pats"
import { getBoxes } from "../../store/actions/users-action"
import SettingCard from "../settingCard/SettingCard"
import "./OwnerHome.css"

const OwnerHome = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const owner = useSelector(state => state.auth.admin)
	const data = useSelector(state => state.user.boxes)
	useEffect(() => {
		dispatch(getBoxes(owner.deviceOwner))
	}, [])

	return (
		<Box mt={3}>
			<div className='owner-home'>
				<div>
					<SettingCard />
				</div>
			</div>
			<Box m={3}>
				<Typography gutterBottom variant='h5' component='div'>
					{t("system")}
				</Typography>
				<TableContainer component={Paper} onClick={() => navigate(BOXES_PAGE)}>
					<Table sx={{ minWidth: 300 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>{t("name")}</TableCell>
								<TableCell align='left'>{t("geolocation")}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.map(row => (
								<TableRow
									key={row.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell align='left'>{row.name}</TableCell>
									<TableCell align='left'>{row.geolocation}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}

export default OwnerHome
