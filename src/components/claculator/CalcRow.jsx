import { TableCell } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { editItemInfo } from "../../store/actions/users-action"
import ChangeField from "../changeField/ChangeField"
import ChangeSelect from "../changeField/ChangedSelect"
import DoubleField from "../changeField/DoubleField"

const CalcRow = ({ row, data, active, ownerID, options }) => {
	const [changedData, setChangedData] = useState({})

	const dispatch = useDispatch()
	const handleChangeData = (name, value) => {
		changedData[name] = value
		setChangedData(changedData)
		dispatch(
			editItemInfo({
				...changedData,
				functionId: row.functionId,
				ownerID,
				active,
			})
		)
	}
	console.log(data, "datadata")
	return (
		<>
			<TableCell component='th' scope='row' align='left'>
				<ChangeField
					name='enginePower'
					value={changedData?.enginePower || data?.enginePower}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<ChangeField
					name='electricPrice'
					value={changedData?.electricPrice || data?.electricPrice}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<ChangeField
					name='waterPerMinute'
					value={changedData?.waterPerMinute || data?.waterPerMinute}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<ChangeField
					name='waterPrice'
					value={changedData?.waterPrice || data?.waterPrice}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<ChangeField
					name='modeValuePerLitre'
					value={changedData?.modeValuePerLitre || data?.modeValuePerLitre}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<ChangeSelect
					name='PrcentOfRegulator'
					value={changedData?.PrcentOfRegulator || data?.PrcentOfRegulator}
					handleChangeData={handleChangeData}
					options={options}
				/>
			</TableCell>
			<TableCell component='th' scope='row' align='left'>
				<DoubleField
					nameFirst={"PrcetOfModeValueFirst"}
					nameSecond={"PrcetOfModeValueSecond"}
					firstValue={
						changedData?.PrcetOfModeValueFirst || data?.PrcetOfModeValueFirst
					}
					secondValue={
						changedData?.PrcetOfModeValueSecond || data?.PrcetOfModeValueSecond
					}
					handleChangeData={handleChangeData}
				/>
			</TableCell>
		</>
	)
}

export default CalcRow
