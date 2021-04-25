import {
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
	POPULATE_FEED_REQUEST,
	POPULATE_FEED_FAIL,
	POPULATE_FEED_SUCCESS,
	USER_POSTS_REQUEST,
	USER_POSTS_SUCCESS,
	USER_POSTS_FAIL,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAIL,
	LIKE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	LIKE_POST_FAIL,
	SHARE_POST_REQUEST,
	SHARE_POST_SUCCESS,
	SHARE_POST_FAIL,
	SHARED_POSTS_REQUEST,
	SHARED_POSTS_SUCCESS,
	SHARED_POSTS_FAIL,
	LIKED_POSTS_REQUEST,
	LIKED_POSTS_SUCCESS,
	LIKED_POSTS_FAIL,
	SINGLE_POST_REQUEST,
	SINGLE_POST_SUCCESS,
	SINGLE_POST_FAIL,
} from '../constants/postConstants'

const initialState = {
	feed: [],
	post: {},
	error: null,
	loading: false,
}
export const postCrudReducer = (state = initialState, action) => {
	switch (action.type) {
		case POPULATE_FEED_REQUEST:
		case SINGLE_POST_REQUEST:
		case CREATE_POST_REQUEST:
		case UPDATE_POST_REQUEST:
		case DELETE_POST_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case POPULATE_FEED_SUCCESS:
			return {
				...state,
				loading: false,
				feed: action.payload.data,
				error: null,
			}
		case CREATE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				feed: [action.payload, ...state.feed],
				error: null,
			}
		case UPDATE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				feed: [
					...state.feed.filter((com) => com._id !== action.payload._id),
					action.payload,
				],
				error: null,
			}
		case DELETE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				feed: state.feed.filter((post) => post._id !== action.payload),
				error: null,
			}
		case SINGLE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				post: action.payload,
				error: null,
			}
		case CREATE_POST_FAIL:
		case SINGLE_POST_FAIL:
		case DELETE_POST_FAIL:
		case UPDATE_POST_FAIL:
		case POPULATE_FEED_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userPostsReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case USER_POSTS_REQUEST:
			return {
				loading: true,
			}
		case USER_POSTS_SUCCESS:
			return {
				loading: false,
				posts: action.payload,
			}
		case USER_POSTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const postLikeReducer = (state = {}, action) => {
	switch (action.type) {
		case LIKE_POST_REQUEST:
			return {
				loading: true,
			}
		case LIKE_POST_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case LIKE_POST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const postShareReducer = (state = {}, action) => {
	switch (action.type) {
		case SHARE_POST_REQUEST:
			return {
				loading: true,
			}
		case SHARE_POST_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case SHARE_POST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const likedPostsReducer = (state = {}, action) => {
	switch (action.type) {
		case LIKED_POSTS_REQUEST:
			return {
				loading: true,
			}
		case LIKED_POSTS_SUCCESS:
			return {
				loading: false,
				posts: action.payload,
			}
		case LIKED_POSTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const sharedPostsReducer = (state = {}, action) => {
	switch (action.type) {
		case SHARED_POSTS_REQUEST:
			return {
				loading: true,
			}
		case SHARED_POSTS_SUCCESS:
			return {
				loading: false,
				posts: action.payload,
			}
		case SHARED_POSTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
