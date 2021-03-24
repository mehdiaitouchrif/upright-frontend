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
