import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import reducers
import {
	loginReducer,
	signUpReducer,
	currentUserReducer,
} from './reducers/authReducers'
import {
	createPostReducer,
	populateFeedReducer,
	userPostsReducer,
	postUpdateReducer,
	postDeleteReducer,
	postLikeReducer,
	postShareReducer,
} from './reducers/postReducers'
import {
	userFollowReducer,
	userSuggestionsReducer,
	userProfileReducer,
} from './reducers/userReducers'
const reducer = combineReducers({
	userLogin: loginReducer,
	userSignUp: signUpReducer,
	currentUser: currentUserReducer,
	feedPosts: populateFeedReducer,
	userPosts: userPostsReducer,
	postCreation: createPostReducer,
	postUpdate: postUpdateReducer,
	postDelete: postDeleteReducer,
	postLike: postLikeReducer,
	postShare: postShareReducer,
	userFollow: userFollowReducer,
	userSuggestions: userSuggestionsReducer,
	userProfile: userProfileReducer,
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
