import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, followUser } from '../../actions/userActions'
import {
	getUserPosts,
	listLikedPosts,
	listSharedPosts,
} from '../../actions/postActions'
import Alert from '../UI/Alert'
import Flex from '../UI/Flex'
import Spinner from '../UI/Spinner'
import './Profile.scss'
import { format } from 'date-fns'
import Button from '../UI/Button'
import Post from '../Posts/Post'
import AppContainer from '../AppContainer'
import GoBack from '../UI/GoBack'
import { Link } from 'react-router-dom'

function Profile({ match, history }) {
	// User details state
	const userProfile = useSelector((state) => state.userProfile)
	const { loading, user, error } = userProfile
	// User info state
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// User posts state
	const userPosts = useSelector((state) => state.userPosts)
	const { posts } = userPosts

	// Shared posts state
	const sharedPosts = useSelector((state) => state.sharedPosts)
	const { posts: shared } = sharedPosts

	// Liked posts state
	const likedPosts = useSelector((state) => state.likedPosts)
	const { posts: liked } = likedPosts

	// Active tab
	const [activePosts, setActivePosts] = useState(posts)

	// Dispatch
	const dispatch = useDispatch()

	const [follow, setFollow] = useState('Follow')
	// Follow user
	function followUserHandler(userId) {
		dispatch(followUser(userId))
		setFollow((prev) => (prev === 'Follow' ? 'Unfollow' : 'Follow'))
	}

	// Switch tabs
	function switchTabs(str) {
		if (str === 'shares') {
			setActivePosts(shared)
		} else if (str === 'likes') {
			setActivePosts(liked)
		} else {
			setActivePosts(posts)
		}
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			dispatch(getUser(match.params.username))
			dispatch(getUserPosts(userInfo.data._id))
			dispatch(listSharedPosts(userInfo.data._id))
			dispatch(listLikedPosts(userInfo.data._id))
		}
	}, [userInfo, history, dispatch, match])

	return (
		<div className='profile'>
			<AppContainer>
				{loading && (
					<Flex justify='center' className='my-2'>
						<Spinner />
					</Flex>
				)}
				{error && <Alert bg='danger'>{error}</Alert>}
				{user && (
					<div className='profile__content'>
						<GoBack text={`${user.firstName} ${user.lastName}`} />
						<div className='profile__head'>
							<div className='profile__head--cover'>
								{user.coverPhoto && (
									<img
										src={user.coverPhoto}
										alt={`${user.username}'s profile cover`}
									/>
								)}
							</div>
						</div>
						<div className='profile__body'>
							<Flex justify='space-between'>
								<div className='profile__showcase'>
									<img
										className='profile__showcase--head'
										src={user.profilePhoto}
										alt={`${user.username}'s profile pic`}
									/>
									<p className='profile__body--name'>
										{user.firstName} {user.lastName}
									</p>
									<p className='profile__body--username'>@{user.username} </p>
								</div>
								<div className='profile__action mt-1'>
									{userInfo && userInfo.data.username === user.username ? (
										<Link to={`/@${user.username}/settings`}>
											<Button type='button' className='rounded' bg='red'>
												Set up profile
											</Button>
										</Link>
									) : (
										<Button
											onClick={() => followUserHandler(user._id)}
											type='button'
											bg='red'
											className='rounded'
										>
											{follow}
										</Button>
									)}
								</div>
							</Flex>
							<Flex align='center' className='mt-1 profile__body--joined'>
								<i className='fas fa-calendar-alt'></i>
								<p>Joined {format(new Date(user.createdAt), 'MMMM yyyy')}</p>
							</Flex>
							<Flex className='mt-1'>
								<p>
									<strong>{user.following.length}</strong> Following
								</p>
								<p className='ml-1'>
									<strong>{user.followers.length}</strong> Followers
								</p>
							</Flex>
							<Flex className='profile__activities mt-1'>
								<div
									onClick={() => switchTabs('posts')}
									className={`profile__activity ${
										activePosts === posts && 'active'
									}`}
								>
									Posts
								</div>
								<div
									onClick={() => switchTabs('shares')}
									className={`profile__activity ${
										activePosts === shared && 'active'
									}`}
								>
									Shares & replies
								</div>
								<div
									className={`profile__activity ${
										activePosts === liked && 'active'
									}`}
									onClick={() => switchTabs('likes')}
								>
									Likes
								</div>
							</Flex>
						</div>
						{activePosts &&
							activePosts.map((post) => (
								<Post key={post._id} user={user} post={post} />
							))}
					</div>
				)}
			</AppContainer>
		</div>
	)
}

export default Profile
