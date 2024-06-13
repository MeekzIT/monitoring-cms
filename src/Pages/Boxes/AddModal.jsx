import CloseIcon from "@mui/icons-material/Close"
import { Grid, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { themePallete } from "../.."
import { useIsMobile } from "../../hooks/useScreenType"
import { addBox } from "../../store/actions/box"

const AddBox = ({ open, handleClose, setGeo, setName, name, geo }) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const { id } = useParams()

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
					{t("add-object")}
				</Typography>
				<div className='mobile-modal-close-btn' onClick={handleClose}>
					<CloseIcon fontSize='large' />
				</div>
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label={t("name")}
								variant='outlined'
								fullWidth
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label={t("geolocation")}
								variant='outlined'
								fullWidth
								value={geo}
								onChange={e => setGeo(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography
								className='btnsBox'
								id='modal-modal-description'
								sx={{ mt: 2 }}
							>
								<div>
									<Button variant='outlined' onClick={handleClose}>
										{t("cancel")}
									</Button>
								</div>
								<div>
									<Button
										variant='contained'
										sx={{ color: "white" }}
										onClick={() => {
											dispatch(
												addBox({
													ownerId: id,
													name,
													geolocation: geo,
												})
											)
											handleClose()
											setGeo("")
											setName("")
										}}
									>
										{t("add")}
									</Button>
								</div>
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Modal>
	)
}

export default AddBox
