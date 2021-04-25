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

const initialState = {
	comments: [],
	comment: {},
	loading: false,
	error: null,
}

export const commentCrudReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_COMMENTS_REQUEST:
		case DELETE_COMMENT_REQUEST:
		case EDIT_COMMENT_REQUEST:
		case ADD_COMMENT_REQUEST:
		case SINGLE_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
			}
		case LIST_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				comments: action.payload,
			}
		case ADD_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: [action.payload, ...state.comments],
			}
		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: state.comments.filter((com) => com._id !== action.payload),
			}
		case EDIT_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: [
					...state.comments.filter((com) => com._id !== action.payload._id),
					action.payload,
				],
			}
		case SINGLE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comment: action.payload,
			}
		case LIST_COMMENTS_FAIL:
		case SINGLE_COMMENT_FAIL:
		case DELETE_COMMENT_FAIL:
		case ADD_COMMENT_FAIL:
		case EDIT_COMMENT_FAIL:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}
