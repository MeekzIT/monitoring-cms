import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { themePallete } from "../.."
import { useIsMobile } from "../../hooks/useScreenType"
import {
	anulateUser,
	destroyUsers,
	getUsers,
} from "../../store/actions/users-action"

const DelUser = ({ openDel, setOpenDel, current, page }) => {
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
			open={openDel}
			onClose={() => {
				setOpenDel(false)
				dispatch(anulateUser())
			}}
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{t("delete")} ?
				</Typography>
				<Typography
					className='btnsBox'
					id='modal-modal-description'
					sx={{ mt: 2 }}
				>
					<div>
						<Button
							variant='contained'
							onClick={() => {
								setOpenDel(false)
							}}
							sx={{ color: "white" }}
						>
							No
						</Button>
					</div>
					<div>
						<Button
							variant='outlined'
							onClick={() => {
								dispatch(destroyUsers({ id: current }))
								dispatch(getUsers(page))
								dispatch(anulateUser())
								setOpenDel(false)
							}}
						>
							Yes
						</Button>
					</div>
				</Typography>
			</Box>
		</Modal>
	)
}

export default DelUser
