import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import reducers
import { loginReducer } from './reducers/authReducers'
import { signUpReducer } from './reducers/authReducers'
const reducer = combineReducers({
	userLogin: loginReducer,
	userSignUp: signUpReducer,
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
