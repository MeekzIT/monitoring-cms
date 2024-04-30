import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Maps from "../../components/map/Map"
import OwnerHome from "../../components/ownerHome/OwnerHome"
import SuperHome from "../../components/superHome/SuperHome"
import UserHome from "../../components/userHome/UserHome"
import { getHomePageStatistics } from "../../store/actions/statistics-action"

import "./home.css"

const HomePage = () => {
	const dispatch = useDispatch()
	const isSuper = useSelector(state => state.auth.isSuper)
	useEffect(() => {
		dispatch(getHomePageStatistics())
	}, [dispatch])

	return (
		<div>
			<Maps />
			{isSuper === "superAdmin" && <SuperHome />}
			{isSuper === "owner" && <OwnerHome />}
			{isSuper === "user" && <UserHome />}
		</div>
	)
}

export default HomePage
