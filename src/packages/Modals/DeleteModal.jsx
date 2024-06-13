import { Box, Button, Modal, Typography } from "@mui/material"

import { useIsMobile } from "../../hooks/useScreenType"
import { useTranslation } from "react-i18next"
import { themePallete } from "../.."

const DeleteModal = ({ open, handleClose, handleDelete }) => {
	const { t } = useTranslation()
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
		<Modal open={open} onClose={handleClose}>
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
							onClick={handleClose}
							sx={{ color: "white" }}
						>
							{t("no")}
						</Button>
					</div>
					<div>
						<Button
							variant='outlined'
							onClick={() => {
								handleDelete()
								handleClose()
							}}
						>
							{t("yes")}
						</Button>
					</div>
				</Typography>
			</Box>
		</Modal>
	)
}

export default DeleteModal
