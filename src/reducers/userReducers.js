import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_PROFILE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_SUGGESTIONS_FAIL,
	USER_SUGGESTIONS_REQUEST,
	USER_SUGGESTIONS_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_CLEAR,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
} from '../constants/userConstants'

export const userProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return {
				loading: true,
			}
		case USER_PROFILE_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case USER_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userFollowReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_FOLLOW_REQUEST:
			return {
				loading: true,
			}
		case USER_FOLLOW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case USER_FOLLOW_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userSuggestionsReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SUGGESTIONS_REQUEST:
			return {
				loading: true,
			}
		case USER_SUGGESTIONS_SUCCESS:
			return {
				loading: false,
				suggestions: action.payload,
			}
		case USER_SUGGESTIONS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return {
				loading: true,
			}
		case USER_UPDATE_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case USER_UPDATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case USER_UPDATE_CLEAR:
			return {}
		default:
			return state
	}
}

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return {
				loading: true,
			}
		case USER_DELETE_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case USER_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userListReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true }
		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			}
		case USER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
