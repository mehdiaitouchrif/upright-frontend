import axios from 'axios'
import { da } from 'date-fns/locale'
import {
	ADD_COMMENT_FAIL,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	DELETE_COMMENT_FAIL,
	DELETE_COMMENT_REQUEST,
	DELETE_COMMENT_SUCCESS,
	EDIT_COMMENT_FAIL,
	EDIT_COMMENT_REQUEST,
	EDIT_COMMENT_SUCCESS,
	LIST_COMMENTS_FAIL,
	LIST_COMMENTS_REQUEST,
	LIST_COMMENTS_SUCCESS,
	SINGLE_COMMENT_FAIL,
	SINGLE_COMMENT_REQUEST,
	SINGLE_COMMENT_SUCCESS,
} from '../constants/commentConstants'

// Set axios config
let config = {
	headers: {
		'Content-Type': 'application/json',
	},
}

export const listComments = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: LIST_COMMENTS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${id}/comments`,
			config
		)
		dispatch({
			type: LIST_COMMENTS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: LIST_COMMENTS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const listSingleComment = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: SINGLE_COMMENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/comments/${id}`,
			config
		)
		dispatch({
			type: SINGLE_COMMENT_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: SINGLE_COMMENT_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const addComment = (id, text) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADD_COMMENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${id}/comments`,
			{ text },
			config
		)
		dispatch({
			type: ADD_COMMENT_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: ADD_COMMENT_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const editComment = (id, newText) => async (dispatch, getState) => {
	try {
		dispatch({ type: EDIT_COMMENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/comments/${id}`,
			{ text: newText },
			config
		)
		dispatch({
			type: EDIT_COMMENT_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: EDIT_COMMENT_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const deleteComment = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_COMMENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		await axios.delete(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/comments/${id}`,
			config
		)
		dispatch({
			type: DELETE_COMMENT_SUCCESS,
			payload: id,
		})
	} catch (error) {
		dispatch({
			type: DELETE_COMMENT_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
