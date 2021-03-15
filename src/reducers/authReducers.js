import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	LOGOUT,
	SIGN_UP_FAIL,
} from '../constants/authConstants'

export const loginReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				loading: true,
			}
		case LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case LOGOUT:
			return {}
		default:
			return state
	}
}

export const signUpReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGN_UP_REQUEST:
			return {
				loading: true,
			}
		case SIGN_UP_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case SIGN_UP_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case LOGOUT:
			return {}
		default:
			return state
	}
}
