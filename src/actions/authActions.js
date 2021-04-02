import axios from 'axios'
import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAIL,
	CURRENT_USER_REQUEST,
	CURRENT_USER_SUCCESS,
	CURRENT_USER_FAIL,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_FAIL,
	SEND_CONFIRMATION_EMAIL_REQUEST,
	SEND_CONFIRMATION_EMAIL_SUCCESS,
	SEND_CONFIRMATION_EMAIL_FAIL,
	EMAIL_CONFIRMED_REQUEST,
	EMAIL_CONFIRMED_SUCCESS,
	EMAIL_CONFIRMED_FAIL,
	RESET_CODE_REQUEST,
	RESET_CODE_SUCCESS,
	RESET_CODE_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from '../constants/authConstants'

// Set axios config
let config = {
	headers: {
		'Content-Type': 'application/json',
	},
}

export const login = (credentials) => async (dispatch, getState) => {
	try {
		dispatch({
			type: LOGIN_REQUEST,
		})

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/login`,
			credentials,
			config
		)

		dispatch({ type: LOGIN_SUCCESS, payload: data })

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		console.log(error)
		dispatch({
			type: LOGIN_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const signUp = (formData) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SIGN_UP_REQUEST,
		})

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/signup`,
			formData,
			config
		)

		dispatch({ type: SIGN_UP_SUCCESS, payload: data })
		dispatch({ type: LOGIN_SUCCESS, payload: data })

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		console.log(error)
		dispatch({
			type: SIGN_UP_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({
		type: LOGOUT,
	})
}

export const getCurrentUser = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CURRENT_USER_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/me`,
			config
		)

		dispatch({
			type: CURRENT_USER_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: CURRENT_USER_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const changePassword = (currentPassword, newPassword) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: CHANGE_PASSWORD_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/changepassword`,
			{ currentPassword, newPassword },
			config
		)

		dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data.success })
	} catch (error) {
		dispatch({
			type: CHANGE_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const requestPasswordReset = (username) => async (dispatch) => {
	try {
		dispatch({ type: RESET_CODE_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/requestpasswordreset`,
			{ username },
			config
		)

		dispatch({
			type: RESET_CODE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RESET_CODE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetPassword = (newPassoword, token) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/resetpassword/${token}`,
			{ password: newPassoword },
			config
		)

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const sendConfirmationEmail = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SEND_CONFIRMATION_EMAIL_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/sendconfirmationemail`,
			null,
			config
		)

		dispatch({
			type: SEND_CONFIRMATION_EMAIL_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: SEND_CONFIRMATION_EMAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const confirmUserEmail = (token) => async (dispatch) => {
	try {
		dispatch({
			type: EMAIL_CONFIRMED_REQUEST,
		})

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/auth/confirmemail/${token}`
		)

		dispatch({
			type: EMAIL_CONFIRMED_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EMAIL_CONFIRMED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
