import { themePallete } from "../.."
import { Box } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const Pagination = ({ pages, page, setPage }) => {
	return (
		<Box>
			<div className='pagBox'>
				<div className='arrowBack'>
					{pages.length - 1 == page ? (
						<ArrowBackIcon
							onClick={() => {
								setPage(page - 1)
							}}
						/>
					) : null}
				</div>
				{pages.length > 1 &&
					pages.map((s, index) => {
						return (
							<div
								key={index}
								className={page === s ? "ActivePagItem" : "pagItem"}
								style={{
									border: `1px solid ${themePallete}`,
									color: themePallete,
									cursor: "pointer",
								}}
								onClick={() => {
									setPage(s)
								}}
							>
								{s + 1}
							</div>
						)
					})}
				<div className='arrowBack'>
					{pages.length - 1 == page ? null : (
						<ArrowForwardIcon
							onClick={() => {
								setPage(page + 1)
							}}
						/>
					)}
				</div>
			</div>
		</Box>
	)
}

export default Pagination
