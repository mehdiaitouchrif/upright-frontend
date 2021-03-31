import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../actions/authActions'
import Posts from '../Posts'
import Create from '../Posts/Create'
import { useEffect } from 'react'
import './Home.scss'
import AppContainer from '../AppContainer'

function Home() {
	// Current user state
	const currentUser = useSelector((state) => state.currentUser)
	const { user } = currentUser

	// Dispatch
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			dispatch(getCurrentUser())
		}
	}, [dispatch, user])

	return (
		<main className='home'>
			<AppContainer>
				<div className='home__main'>
					<div className='home__head'>Home</div>
					<Create user={user} />
					<Posts user={user} />
				</div>
			</AppContainer>
		</main>
	)
}

export default Home
