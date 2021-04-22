import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Profile from './components/Profile'
import Settings from './components/Settings'
import ForgotPassword from './components/ForgotPassword'
import AppContainer from './components/AppContainer'

function App() {
	return (
		<Router>
			<div className='App'>
				<Route exact path='/@:username' component={withRouter(Profile)} />
				<Route path='/@:username/settings' component={Settings} />
				<Route path='/search' component={AppContainer} />
				<Route path='/login' component={Login} />
				<Route exact path='/' component={Home} />
			</div>
			<Route exact path='/forgotpassword' component={ForgotPassword} />
		</Router>
	)
}

export default App
