import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	LOGOUT,
	SIGN_UP_FAIL,
	CURRENT_USER_REQUEST,
	CURRENT_USER_SUCCESS,
	CURRENT_USER_FAIL,
	SEND_CONFIRMATION_EMAIL_REQUEST,
	SEND_CONFIRMATION_EMAIL_SUCCESS,
	SEND_CONFIRMATION_EMAIL_FAIL,
	EMAIL_CONFIRMED_REQUEST,
	EMAIL_CONFIRMED_SUCCESS,
	EMAIL_CONFIRMED_FAIL,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_FAIL,
	RESET_CODE_REQUEST,
	RESET_CODE_SUCCESS,
	RESET_CODE_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
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

export const currentUserReducer = (state = {}, action) => {
	switch (action.type) {
		case CURRENT_USER_REQUEST:
			return {
				loading: true,
			}
		case CURRENT_USER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case CURRENT_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const passwordChangeReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANGE_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case CHANGE_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case CHANGE_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const confirmationSendingReducer = (state = {}, action) => {
	switch (action.type) {
		case SEND_CONFIRMATION_EMAIL_REQUEST:
			return {
				loading: true,
			}
		case SEND_CONFIRMATION_EMAIL_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case SEND_CONFIRMATION_EMAIL_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const emailConfirmationReducer = (state = {}, action) => {
	switch (action.type) {
		case EMAIL_CONFIRMED_REQUEST:
			return {
				loading: true,
			}
		case EMAIL_CONFIRMED_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case EMAIL_CONFIRMED_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const resetRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_CODE_REQUEST:
			return {
				loading: true,
			}
		case RESET_CODE_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case RESET_CODE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const passwordResetRedcuer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case RESET_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
