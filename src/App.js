import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'

function App() {
	return (
		<Router>
			<div className='App'>
				<Route path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={SignUp} />
			</div>
		</Router>
	)
}

export default App
