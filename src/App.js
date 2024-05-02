import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import MainLayout from "./containers/layout/layout"
import { LOGIN_PAGE } from "./routing/pats"
import { getMe, logoutAction, setAuthAction } from "./store/actions/auth-action"

function App() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isAuth = JSON.parse(localStorage.getItem("isAuth"))
	const token = JSON.parse(localStorage.getItem("token"))

	console.log(window.location)
	useEffect(() => {
		if (!localStorage.getItem("language")) {
			localStorage.setItem("language", "ru")
		}
		if (window.location.pathname == "/taha") {
			localStorage.setItem("type", "taha")
		}
		if (window.location.pathname == "/") {
			localStorage.setItem("type", "jsx")
		}

		if (window.location.host == "senyu.online") {
			localStorage.setItem("type", "senyu")
		}

		if (window.location.host == "strongwash.online") {
			localStorage.setItem("type", "strongwash")
		}

		if (isAuth) {
			dispatch(setAuthAction(true))
			dispatch(getMe())
		} else {
			navigate(LOGIN_PAGE)
		}
	}, [])
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch(logoutAction())
			console.log("1 hour has passed!")
		}, 1200000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [])

	useEffect(() => {
		if (isAuth && token == null) {
			dispatch(logoutAction())
			localStorage.removeItem("isAuth")
			localStorage.removeItem("isSuper")
			localStorage.removeItem("token")
			window.location.href = LOGIN_PAGE
		}
	}, [])

	return (
		<div>
			<MainLayout />
		</div>
	)
}

export default App
