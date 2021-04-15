import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSuggestions, followUser } from '../../actions/userActions'
import SearchBox from '../SearchBox'
import Flex from '../UI/Flex'
import Spinner from '../UI/Spinner'
import './Aside.scss'

function Aside() {
	const dispatch = useDispatch()

	const currentUser = useSelector((state) => state.currentUser)
	const { user } = currentUser

	const userSuggestions = useSelector((state) => state.userSuggestions)
	const { loading, suggestions } = userSuggestions

	const userFollow = useSelector((state) => state.userFollow)
	const { success: followSuccess } = userFollow

	function handleUserFollow(userId) {
		dispatch(followUser(userId))
	}

	useEffect(() => {
		dispatch(getSuggestions())
	}, [dispatch, followSuccess])

	return (
		<div className='aside'>
			<SearchBox />
			{/* {user ? (
				<Link to={`/@${user.username}`}>
					<Flex align='center' className='aside__profile'>
						<img src={user.profilePhoto} alt='Profile' />
						<div>
							<p>{user.username}</p>
							<p>
								{user.firstName} {user.lastName}
							</p>
						</div>
					</Flex>
				</Link>
			) : (
				<Flex justify='center'>
					<Spinner />
				</Flex>
			)} */}

			<p className='lead'>Suggestions for you</p>
			{suggestions &&
				suggestions.map((sugg) => (
					<Flex key={sugg._id} className='aside__suggestion'>
						<Link to={`/@${sugg.username}`}>
							<Flex align='center'>
								<img src={sugg.profilePhoto} alt='Suggested Profile' />
								<div>
									<p className='bold'>{sugg.username}</p>
									<p>Suggested for you</p>
								</div>
							</Flex>
						</Link>
						<button onClick={() => handleUserFollow(sugg._id)}>Follow</button>
					</Flex>
				))}

			{loading && (
				<Flex justify='center'>
					<Spinner />
				</Flex>
			)}
		</div>
	)
}

export default Aside
