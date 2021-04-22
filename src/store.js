import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import reducers
import {
	loginReducer,
	signUpReducer,
	currentUserReducer,
	passwordChangeReducer,
	resetRequestReducer,
	passwordResetRedcuer,
	confirmationSendingReducer,
	emailConfirmationReducer,
} from './reducers/authReducers'
import {
	createPostReducer,
	populateFeedReducer,
	userPostsReducer,
	postUpdateReducer,
	postDeleteReducer,
	postLikeReducer,
	postShareReducer,
	likedPostsReducer,
	sharedPostsReducer,
} from './reducers/postReducers'
import {
	userFollowReducer,
	userSuggestionsReducer,
	userProfileReducer,
	userUpdateReducer,
	userDeleteReducer,
	userListReducer,
} from './reducers/userReducers'
const reducer = combineReducers({
	userLogin: loginReducer,
	userSignUp: signUpReducer,
	currentUser: currentUserReducer,
	passwordChange: passwordChangeReducer,
	confirmationSending: confirmationSendingReducer,
	emailConfirmation: emailConfirmationReducer,
	resetRequest: resetRequestReducer,
	passwordReset: passwordResetRedcuer,
	feedPosts: populateFeedReducer,
	userPosts: userPostsReducer,
	userList: userListReducer,
	postCreation: createPostReducer,
	postUpdate: postUpdateReducer,
	postDelete: postDeleteReducer,
	postLike: postLikeReducer,
	postShare: postShareReducer,
	likedPosts: likedPostsReducer,
	sharedPosts: sharedPostsReducer,
	userFollow: userFollowReducer,
	userSuggestions: userSuggestionsReducer,
	userProfile: userProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromLocalStorage },
}

const middleweare = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleweare))
)

export default store
