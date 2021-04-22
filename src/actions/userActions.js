import {
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	USER_SUGGESTIONS_REQUEST,
	USER_SUGGESTIONS_SUCCESS,
	USER_SUGGESTIONS_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
} from '../constants/userConstants'
import axios from 'axios'

// axios config
let config = {
	headers: {
		'Content-Type': 'application/json',
	},
}

export const getUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/${id}`,
			config
		)

		dispatch({
			type: USER_PROFILE_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const followUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_FOLLOW_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/${id}/follow`,
			{},
			config
		)

		dispatch({ type: USER_FOLLOW_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_FOLLOW_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const getSuggestions = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_SUGGESTIONS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/recommend`,
			config
		)
		dispatch({
			type: USER_SUGGESTIONS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_SUGGESTIONS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const updateUser = (updatedUser) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/${updatedUser._id}`,
			updatedUser,
			config
		)
		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.delete(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/${id}/`,
			config
		)
		dispatch({
			type: USER_DELETE_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUsers = (search = '') => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users?search=${search}`,
			config
		)
		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
