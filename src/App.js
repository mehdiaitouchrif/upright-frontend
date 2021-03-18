import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'

function App() {
	return (
		<Router>
			<div className='App'>
				<Route exact path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={SignUp} />
			</div>
		</Router>
	)
}

export default App
