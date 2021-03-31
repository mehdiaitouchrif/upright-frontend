import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Profile from './components/Profile'
import Settings from './components/Settings'

function App() {
	return (
		<Router>
			<div className='App mx-2'>
				<Route exact path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route exact path='/@:username' component={Profile} />
				<Route exact path='/@:username/settings' component={Settings} />
			</div>
		</Router>
	)
}

export default App
