import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { populateFeed } from '../../actions/postActions'
import Post from './Post'
import Spinner from '../UI/Spinner'
import Alert from '../UI/Alert'
import './Posts.scss'

function Posts({ user }) {
	const dispatch = useDispatch()

	const feedPosts = useSelector((state) => state.feedPosts)
	const { loading, error, posts } = feedPosts

	const postCreation = useSelector((state) => state.postCreation)
	const { success: createSuccess } = postCreation

	const postDeletion = useSelector((state) => state.postDelete)
	const { success: deleteSuccess } = postDeletion

	const postLike = useSelector((state) => state.postLike)
	const { success: likeSuccess } = postLike

	const postShare = useSelector((state) => state.postShare)
	const { success: shareSuccess } = postShare

	useEffect(() => {
		dispatch(populateFeed())
	}, [dispatch, createSuccess, deleteSuccess, likeSuccess, shareSuccess])

	return (
		<div className='posts'>
			{loading && <Spinner />}
			{error && <Alert bg='danger'>{error}</Alert>}
			{posts &&
				posts.map((post) => <Post key={post._id} user={user} post={post} />)}
		</div>
	)
}

Posts.propTypes = {
	posts: PropTypes.array,
}

export default Posts
