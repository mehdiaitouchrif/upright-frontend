import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Profile from './components/Profile'
import Settings from './components/Settings'
import ForgotPassword from './components/ForgotPassword'
import AppContainer from './components/AppContainer'
import PostPage from './components/PostPage'
import NotFound from './components/404'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/@:username' component={withRouter(Profile)} />
				<Route path='/@:username/settings' component={Settings} />
				<Route path='/search' component={AppContainer} />
				<Route path='/post/:id' component={PostPage} />
				<Route path='/login' component={Login} />
				<Route exact path='/' component={Home} />
				<Route exact path='/forgotpassword' component={ForgotPassword} />
				<Route path='*' component={NotFound} />
			</Switch>
		</Router>
	)
}

export default App
