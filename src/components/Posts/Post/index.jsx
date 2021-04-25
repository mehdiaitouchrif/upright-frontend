import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../../actions/postActions'
import Card from '../../UI/Card'
import Flex from '../../UI/Flex'
import Share from '../Share'
import Edit from '../Edit'
import Comment from '../Comment'
import './Post.scss'
import PostFooter from './PostFooter'

function Post({ post, user, showFooter }) {
	const dispatch = useDispatch()

	const options = useRef(null)

	function showOptions() {
		options.current.classList.toggle('none')
	}

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

	const [isComment, setIsComment] = useState(false)
	function showCommentModal() {
		setIsComment(!isComment)
	}

	function handlePostShare() {
		showShareModal()
	}

	function handlePostEdit() {
		showEditModal()
	}

	function handlePostComment() {
		showCommentModal()
	}

	return (
		<Card className='post mb-1'>
			{isShare && (
				<Share
					user={user}
					post={post}
					title='Share post'
					customSize={700}
					showModal={showShareModal}
				/>
			)}
			{isEdit && (
				<Edit
					post={post}
					showModal={showEditModal}
					title='Edit post'
					customSize={700}
				/>
			)}
			{isComment && (
				<Comment
					post={post}
					showModal={showCommentModal}
					title='Comment post'
					customSize={700}
					user={user}
				/>
			)}

			<Flex>
				<div className='post__user'>
					<Link to={`/@${post.user.username}`}>
						<img
							src={post.user.profilePhoto}
							alt={`${post.user.username} avatar`}
						/>
					</Link>
				</div>
				<div className='post__details'>
					<p>
						<Flex justify='space-between' align='center'>
							<div>
								<Link to={`/@${post.user.username}`}>
									{post.user.firstName} {post.user.lastName}
								</Link>
								<span>@{post.user.username}</span>
							</div>
							{post && user && post.user._id === user._id && (
								<i
									onClick={showOptions}
									className='fas fa-ellipsis-h post__trigger'
								></i>
							)}
						</Flex>
					</p>
					<Link
						style={{ display: 'block', width: '100%', textDecoration: 'none' }}
						to={`/post/${post._id}`}
					>
						<h3 className='tertiary-heading'>{post.text}</h3>
						{post.image && (
							<img className='post__image' src={post.image} alt={post.image} />
						)}
					</Link>
				</div>
			</Flex>
			{showFooter !== false && (
				<PostFooter
					post={post}
					handlePostLike={handlePostLike}
					handlePostShare={handlePostShare}
					handlePostComment={handlePostComment}
				/>
			)}
			{post && user && post.user._id === user._id && (
				<div ref={options} className='post__options mt-2 none'>
					<Flex align='center' onClick={handlePostEdit}>
						<img src='/images/edit.png' alt='Edit' />
						<p>Edit</p>
					</Flex>
					<Flex align='center' onClick={() => handlePostDelete(post._id)}>
						<img src='/images/remove.png' alt='Delete' />
						<p>Delete</p>
					</Flex>
				</div>
			)}
		</Card>
	)
}

Post.propTypes = {
	text: PropTypes.string,
	user: PropTypes.object,
}

export default Post
