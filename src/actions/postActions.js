import axios from 'axios'
import {
	CREATE_POST_FAIL,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAIL,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	LIKED_POSTS_FAIL,
	LIKED_POSTS_REQUEST,
	LIKED_POSTS_SUCCESS,
	LIKE_POST_FAIL,
	LIKE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	POPULATE_FEED_FAIL,
	POPULATE_FEED_REQUEST,
	POPULATE_FEED_SUCCESS,
	SHARED_POSTS_FAIL,
	SHARED_POSTS_REQUEST,
	SHARED_POSTS_SUCCESS,
	SHARE_POST_FAIL,
	SHARE_POST_REQUEST,
	SHARE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	USER_POSTS_FAIL,
	USER_POSTS_REQUEST,
	USER_POSTS_SUCCESS,
} from '../constants/postConstants'

// Set axios config
let config = {
	headers: {
		'Content-Type': 'application/json',
	},
}

export const createPost = (post) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_POST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}
		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts`,
			post,
			config
		)

		dispatch({
			type: CREATE_POST_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: CREATE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const getUserPosts = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_POSTS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/${id}/posts`,
			config
		)

		dispatch({
			type: USER_POSTS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_POSTS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const populateFeed = (page = 1) => async (dispatch, getState) => {
	try {
		dispatch({ type: POPULATE_FEED_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/populate?page=${page}`,
			config
		)

		dispatch({
			type: POPULATE_FEED_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: POPULATE_FEED_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const updatePost = (post) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_POST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${post._id}`,
			post,
			config
		)

		dispatch({
			type: UPDATE_POST_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: UPDATE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const deletePost = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_POST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.delete(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${id}`,
			config
		)

		dispatch({
			type: DELETE_POST_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: DELETE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const likePost = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: LIKE_POST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${id}/like`,
			{},
			config
		)

		dispatch({
			type: LIKE_POST_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: LIKE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const sharePost = (id, text) => async (dispatch, getState) => {
	try {
		dispatch({ type: SHARE_POST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${id}/share`,
			text ? { text } : {},
			config
		)

		dispatch({
			type: SHARE_POST_SUCCESS,
			payload: data.success,
		})
	} catch (error) {
		dispatch({
			type: SHARE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const listLikedPosts = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: LIKED_POSTS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${userId}/likes`,
			config
		)
		dispatch({
			type: LIKED_POSTS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: LIKED_POSTS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const listSharedPosts = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: SHARED_POSTS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		config = {
			headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
		}

		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/posts/${userId}/shares`,
			config
		)
		dispatch({
			type: SHARED_POSTS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: SHARED_POSTS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
