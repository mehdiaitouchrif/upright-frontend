import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/postActions'
import Card from '../../UI/Card'
import Flex from '../../UI/Flex'
import Share from '../Share'
import Edit from '../Edit'
import './Post.scss'
import PostFooter from './PostFooter'

function Post({ post, user, showFooter }) {
	const dispatch = useDispatch()

	function handlePostDelete(id) {
		dispatch(deletePost(id))
	}

	function handlePostLike(id) {
		dispatch(likePost(id))
	}

	const [isShare, setIsShare] = useState(false)
	function showShareModal() {
		setIsShare(!isShare)
	}

	const [isEdit, setIsEdit] = useState(false)
	function showEditModal() {
		setIsEdit(!isEdit)
	}

	function handlePostShare(id) {
		showShareModal()
	}

	function handlePostEdit() {
		showEditModal()
	}

	return (
		<Card className='post mb-1'>
			{isShare && <Share user={user} post={post} showModal={showShareModal} />}
			{isEdit && <Edit post={post} showModal={showEditModal} />}
			<Flex>
				<div className='post__user'>
					<Link to={`/${post.user.username}`}>
						<img
							src={post.user.profilePhoto}
							alt={`${post.user.username} avatar`}
						/>
					</Link>
				</div>
				<div className='post__details'>
					<p>
						<Link to={`/${post.user.username}`}>
							{post.user.firstName} {post.user.lastName}
						</Link>
						<span>@{post.user.username}</span>
					</p>
					<h3 className='tertiary-heading'>{post.text}</h3>
					{post.image && <img src={post.image} alt={post.image} />}
					{showFooter !== false && (
						<PostFooter
							post={post}
							user={user}
							handlePostDelete={handlePostDelete}
							handlePostLike={handlePostLike}
							handlePostShare={handlePostShare}
							handlePostEdit={handlePostEdit}
						/>
					)}
				</div>
			</Flex>
		</Card>
	)
}

Post.propTypes = {
	text: PropTypes.string,
	user: PropTypes.object,
}

export default Post
