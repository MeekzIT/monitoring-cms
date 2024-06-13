import EditIcon from "@mui/icons-material/Edit"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import DeleteIcon from "@mui/icons-material/Delete"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "../../hooks/useScreenType"

const DataTable = ({
	data,
	cells,
	columns,
	setCurrrent,
	handleEdit,
	handleDelete,
	isDeleting,
	isEditing,
}) => {
	const { t } = useTranslation()
	const isMobile = useIsMobile()
	const [anchorEl, setAnchorEl] = useState(null)

	const openMenu = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	console.log({ columns })
	return (
		<Box sx={{ overflow: "auto" }}>
			<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 320 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								{cells?.map(({ id, name, show }) => {
									if (show) {
										return (
											<TableCell key={id}>
												{typeof name === "string" ? t(name) : name}
											</TableCell>
										)
									}
								})}
								{!isMobile ? (
									<>
										{isEditing && (
											<TableCell align='left'>{t("edit")}</TableCell>
										)}
										{isDeleting && (
											<TableCell align='left'>{t("delete")}</TableCell>
										)}
									</>
								) : (
									<TableCell align='left'>{t("settings")}</TableCell>
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.map(row => (
								<TableRow
									key={row?.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									{columns?.map(({ id, show, name, action, fn }) => {
										if (show) {
											if (name) {
												return (
													<TableCell
														onClick={() => {
															if (action) {
																return fn(row)
															}
														}}
														align='left'
													>
														{name(row)}
													</TableCell>
												)
											} else {
												return (
													<TableCell align='left'>
														<Button
															variant='contained'
															onClick={() => {
																fn(row)
															}}
														>
															<RemoveRedEyeIcon
																sx={{
																	color: "white",
																}}
															/>
														</Button>
													</TableCell>
												)
											}
										}
									})}
									{!isMobile ? (
										<>
											{isEditing && (
												<TableCell align='left'>
													<Button
														variant='outlined'
														onClick={() => handleEdit(row)}
													>
														<EditIcon />
													</Button>
												</TableCell>
											)}

											{isDeleting && (
												<TableCell align='left'>
													<Button
														variant='outlined'
														onClick={() => handleDelete(row)}
													>
														<DeleteIcon />
													</Button>
												</TableCell>
											)}
										</>
									) : (
										<TableCell
											align='left'
											onClick={e => {
												setCurrrent(row?.id)
											}}
										>
											<Button
												id={row.id}
												variant='outlined'
												aria-haspopup='true'
												onClick={e => {
													handleClick(e)
												}}
											>
												<SettingsIcon />
											</Button>
											<Menu
												anchorEl={anchorEl}
												open={openMenu}
												onClose={() => {
													setAnchorEl(null)
												}}
											>
												{isEditing && (
													<MenuItem>
														<Button
															id={row.id}
															fullWidth
															variant='outlined'
															endIcon={<EditIcon />}
															onClick={() => handleEdit(row)}
														>
															{t("edit")}
														</Button>
													</MenuItem>
												)}
												{isDeleting && (
													<MenuItem>
														<Button
															fullWidth
															endIcon={<RemoveRedEyeIcon />}
															variant='outlined'
															onClick={() => handleDelete(row)}
														>
															{t("delete")}
														</Button>
													</MenuItem>
												)}
											</Menu>
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}

export default DataTable
