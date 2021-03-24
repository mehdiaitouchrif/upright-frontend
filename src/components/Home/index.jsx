import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getCurrentUser } from '../../actions/authActions'
import Posts from '../Posts'
import Create from '../Posts/Create'
import Container from '../UI/Container'
import { useEffect } from 'react'

function Home({ history }) {
	const dispatch = useDispatch()

	function logoutHandler() {
		dispatch(logout())
	}

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const currentUser = useSelector((state) => state.currentUser)
	const { user } = currentUser

	useEffect(() => {
		if (!user) {
			dispatch(getCurrentUser())
		}
		if (!userInfo) {
			history.push('/login')
		}
	}, [dispatch, user, history, userInfo])

	return (
		<Container size='md'>
			<Create user={user} />
			<Posts user={user} />
			<Link to='/login'>Login</Link>
			<button onClick={logoutHandler}>Logout</button>
		</Container>
	)
}

export default Home
