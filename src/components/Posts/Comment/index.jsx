import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../../actions/commentActions'
import { Link } from 'react-router-dom'
import Modal from '../../UI/Modal'
import TextArea from '../../UI/FormComponents/TextArea'
import Button from '../../UI/Button'
import Flex from '../../UI/Flex'
import './Comment.scss'
import Spinner from '../../UI/Spinner'

function Comment({ post, user, showModal, title, customSize }) {
	const [comment, setComment] = useState('')

	const commentCrud = useSelector((state) => state.commentCrud)
	const { loading } = commentCrud

	const dispatch = useDispatch()

	// function addCommentHandler() {
	// 	dispatch(addComment(post._id, comment))
	// 	if (!loading) {
	// 		showModal()
	// 	}
	// }

	return (
		<Modal title={title} showModal={showModal} customSize={customSize}>
			<Flex align='center'>
				<div className='comment__user'>
					<img src={user.profilePhoto} alt={user.username} />
				</div>
				<TextArea
					name='text'
					className='comment__input'
					placeholder='Your comment'
					onChange={(e) => setComment(e.target.value)}
					value={comment}
				/>
			</Flex>
			<Flex>
				<div className='comment__user' style={{ visibility: 'hidden' }}>
					<img src={user.profilePhoto} alt={user.username} />
				</div>
				<div className='comment__post my-1'>
					<Flex>
						<div className='post__user'>
							<Link to={`/@${post.user.username}`}>
								<img
									src={post.user.profilePhoto}
									alt={`${post.user.username} avatar`}
								/>
							</Link>
						</div>
						<Link to={`/post/${post._id}`} className='post__details'>
							<p>
								<Flex justify='space-between' align='center'>
									<div>
										<Link to={`/@${post.user.username}`}>
											{post.user.firstName} {post.user.lastName}
										</Link>
										<span>@{post.user.username}</span>
									</div>
								</Flex>
							</p>
							<h3 className='tertiary-heading'>{post.text}</h3>
							{post.image && (
								<img
									className='post__image'
									src={post.image}
									alt={post.image}
								/>
							)}
						</Link>
					</Flex>
				</div>
			</Flex>
			{loading && (
				<Flex justify='center my-1'>
					<Spinner />
				</Flex>
			)}
			<Flex justify='right'>
				<form>
					<Button type='submit' bg='blue' className='rounded'>
						Comment
					</Button>
				</form>
			</Flex>
		</Modal>
	)
}

export default Comment
