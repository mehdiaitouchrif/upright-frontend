import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { populateFeed } from '../../actions/postActions'
import Post from './Post'
import Spinner from '../UI/Spinner'
import Alert from '../UI/Alert'
import './Posts.scss'
import Flex from '../UI/Flex'

function Posts({ user }) {
	const dispatch = useDispatch()

	// State
	const postCrud = useSelector((state) => state.postCrud)
	const { feed, loading, error } = postCrud

	const postLike = useSelector((state) => state.postLike)
	const { success: likeSuccess } = postLike

	const postShare = useSelector((state) => state.postShare)
	const { success: shareSuccess } = postShare

	useEffect(() => {
		dispatch(populateFeed())
	}, [dispatch, likeSuccess, shareSuccess])

	return (
		<div className='posts'>
			{loading && (
				<Flex justify='center' className='mb-2'>
					<Spinner />
				</Flex>
			)}
			{error && <Alert bg='danger'>{error}</Alert>}

			{feed && feed.length === 0 && (
				<div className='posts__empty'>
					<p>Nothing here yet!</p>
				</div>
			)}
			{feed &&
				feed.map((post) => <Post key={post._id} user={user} post={post} />)}
		</div>
	)
}

Posts.propTypes = {
	posts: PropTypes.array,
}

export default Posts
