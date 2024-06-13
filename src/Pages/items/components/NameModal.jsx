import CloseIcon from "@mui/icons-material/Close"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "../../../hooks/useScreenType"
import { themePallete } from "../../.."

const BoxName = ({ open, handleClose, name, setName, handleAddName }) => {
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
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{t("name")}
				</Typography>
				<div className='mobile-modal-close-btn' onClick={handleClose}>
					<CloseIcon fontSize='large' />
				</div>
				<Box>
					<TextField value={name} onChange={e => setName(e.target.value)} />
				</Box>
				<Box mt={2}>
					<Button variant='contained' onClick={handleAddName}>
						{t("save")}
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default BoxName
