import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useTranslation } from "react-i18next"
import { Divider, Grid, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch } from "react-redux"
import { useIsMobile } from "../../hooks/useScreenType"
import CloseIcon from "@mui/icons-material/Close"
import { themePallete } from "../.."
import {
	addBoxExpenses,
	destroyBoxExpenses,
	editBoxExpenses,
	getBoxExpenses,
} from "../../store/actions/box"

const OtherSeetings = ({
	open,
	handleClose,
	setAddField,
	addField,
	addedFieldValueName,
	setAddedFieldValueName,
	addedFieldValuePrice,
	setAddedFieldValuePrice,
	currentId,
	currentOwner,
	boxExpernses,
	setNameExpenses,
	setPrice,
	nameExpenses,
	price,
}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: isMobile ? "100%" : 400,
		bgcolor: "background.paper",
		border: `3px solid ${themePallete}`,
		boxShadow: 24,
		p: 4,
		borderRadius: "10px",
		minHeight: isMobile ? "100vh" : null,
		display: isMobile && "flex",
		justifyContent: isMobile && "center",
		alignItems: isMobile && "center",
		flexDirection: isMobile && "column",
		gap: isMobile && "20px",
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{t("difrentExspenses")}
				</Typography>
				<div className='mobile-modal-close-btn' onClick={handleClose}>
					<CloseIcon fontSize='large' />
				</div>

				<Box
					mt={2}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Box m={2}>
						<Box m={2}>
							<Button
								variant='contained'
								fullWidth
								onClick={() => setAddField(!addField)}
							>
								{addField ? <ArrowBackIcon /> : <AddIcon />}
							</Button>
						</Box>
						{addField ? (
							<Box>
								<Box
									m={2}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: "20px",
									}}
								>
									<div>
										<TextField
											label={t("name")}
											name='name'
											value={addedFieldValueName}
											variant='outlined'
											onChange={e => setAddedFieldValueName(e.target.value)}
											fullWidth
										/>
									</div>
									<div>
										<TextField
											label={t("price")}
											name='price'
											value={addedFieldValuePrice}
											variant='outlined'
											onChange={e => setAddedFieldValuePrice(e.target.value)}
											fullWidth
										/>
									</div>
								</Box>

								<Button
									variant='outlined'
									fullWidth
									onClick={() => {
										dispatch(
											addBoxExpenses({
												boxId: currentId,
												ownerId: currentOwner,
												name: addedFieldValueName,
												price: addedFieldValuePrice,
											})
										)
										setAddField(false)
										setAddedFieldValuePrice("")
										setAddedFieldValueName("")
										dispatch(
											getBoxExpenses({
												boxId: currentId,
												ownerId: currentOwner,
											})
										)
									}}
								>
									{t("savechanges")}
								</Button>
								<Divider />
							</Box>
						) : (
							boxExpernses?.map(i => {
								return (
									<Box>
										<Box
											m={2}
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: "20px",
											}}
										>
											<div>
												<TextField
													label={t("name")}
													name='name'
													defaultValue={i.name}
													variant='outlined'
													onChange={e => setNameExpenses(e.target.value)}
													fullWidth
												/>
											</div>
											<div>
												<TextField
													label={t("price")}
													name='price'
													defaultValue={i.price}
													variant='outlined'
													onChange={e => setPrice(e.target.value)}
													fullWidth
												/>
											</div>
										</Box>
										<Box
											m={2}
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: "20px",
											}}
										>
											<div>
												<Button
													variant='outlined'
													fullWidth
													onClick={() => {
														dispatch(
															editBoxExpenses({
																id: i.id,
																name: nameExpenses,
																price,
															})
														)
													}}
												>
													{t("savechanges")}
												</Button>
											</div>
											<div>
												<Button
													variant='outlined'
													fullWidth
													onClick={() => {
														dispatch(
															destroyBoxExpenses({
																id: i.id,
															})
														)
													}}
												>
													{t("delete")}
												</Button>
											</div>
										</Box>
										<Divider />
									</Box>
								)
							})
						)}
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}

export default OtherSeetings
