import axios from "axios"
import Swal from "sweetalert2"
import { keys } from "../../keys"
import { HOME_PAGE, LOGIN_PAGE } from "../../routing/pats"
import {
	CRATE_ADMIN,
	DESTSROY_ADMIN,
	EDIT_ADMIN,
	GET_ADMINS,
	LOGIN_ACTION,
	SET_AUTH,
} from "../types"

export const loginAction = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/admin/login`, data)
			.then(function (response) {
				if (response.data.succes) {
					dispatch({
						type: LOGIN_ACTION,
						payload: {
							isAuth: true,
							data: response.data.data,
							isSuper: response.data.data.role,
						},
					})
					localStorage.setItem("isAuth", JSON.stringify(true))
					localStorage.setItem(
						"isSuper",
						JSON.stringify(response.data.data.role)
					)
					localStorage.setItem(
						"token",
						JSON.stringify(response.data.data.token)
					)
					window.location.href = HOME_PAGE
				} else
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "error",
						showConfirmButton: false,
						timer: 1500,
						title: "Неправильные Данные",
					})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const resetPassword = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/admin/reset`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(function (response) {
				if (response.data.succes) {
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "success",
						showConfirmButton: false,
						timer: 1500,
					})
				} else
					Swal.fire({
						position: "center",
						iconColor: "#008491",
						icon: "error",
						showConfirmButton: false,
						timer: 1500,
						title: "Неправильные Данные",
					})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const setAuthAction = data => {
	return dispatch => {
		dispatch({ type: SET_AUTH, payload: data })
	}
}

export const logoutAction = data => {
	return dispatch => {
		axios
			.post(
				`${keys.api}/admin/clear`,
				{ data },
				{
					headers: {
						Authorization: `Bearer ${keys.token}`,
					},
				}
			)
			.then(function (response) {})
			.catch(function (error) {
				console.error(error)
			})
		axios
			.post(
				`${keys.api}/admin/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${keys.token}`,
					},
				}
			)
			.then(function (response) {
				const type = localStorage.getItem("type")
				if (response.data.succes) {
					dispatch({ type: SET_AUTH, payload: false })
					localStorage.removeItem("isAuth")
					localStorage.removeItem("isSuper")
					localStorage.removeItem("token")
					window.location.href = LOGIN_PAGE
				}
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const getMe = () => {
	return dispatch => {
		axios
			.get(`${keys.api}/admin/me`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				dispatch({
					type: LOGIN_ACTION,
					payload: {
						isAuth: true,
						data: response.data.data,
						isSuper: response.data.data.role,
					},
				})
				localStorage.setItem("isAuth", JSON.stringify(true))
				localStorage.setItem("isSuper", JSON.stringify(response.data.data.role))
				localStorage.setItem("token", JSON.stringify(response.data.data.token))
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const getAdmins = () => {
	return dispatch => {
		axios
			.get(`${keys.api}/admin/`, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(response => {
				dispatch({
					type: GET_ADMINS,
					payload: response.data.data,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const addAdmin = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/admin/create`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(function (response) {
				dispatch({
					type: CRATE_ADMIN,
					payload: response.data.data,
				})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const destroyAdmin = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/admin/destroy`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(function (response) {
				dispatch({
					type: DESTSROY_ADMIN,
					payload: data.id,
				})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const activityAdmin = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/admin/activity`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(function (response) {
				dispatch({
					type: EDIT_ADMIN,
					payload: data,
				})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}

export const changeItemActivity = data => {
	return dispatch => {
		axios
			.post(`${keys.api}/owner/item-accessability`, data, {
				headers: {
					Authorization: `Bearer ${keys.token}`,
				},
			})
			.then(function (response) {
				dispatch({
					type: EDIT_ADMIN,
					payload: data,
				})
			})
			.catch(function (error) {
				console.error(error)
			})
	}
}
