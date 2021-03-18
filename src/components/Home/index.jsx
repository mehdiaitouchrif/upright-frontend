import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/authActions'

function Home() {
	const dispatch = useDispatch()

	function logoutHandler() {
		dispatch(logout())
	}

	return (
		<main>
			<h1>Home</h1>

			<Link to='/login'>Login</Link>
			<button onClick={logoutHandler}>Logout</button>
		</main>
	)
}

export default Home
