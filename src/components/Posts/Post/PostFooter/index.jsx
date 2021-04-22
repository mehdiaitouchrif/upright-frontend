import './PostFooter.scss'
import Flex from '../../../UI/Flex'

function PostFooter({
	user,
	post,
	handlePostDelete,
	handlePostLike,
	handlePostShare,
	handlePostEdit,
}) {
	return (
		<div className='post-footer'>
			<Flex justify='space-between' align='center' className='post__tools'>
				<Flex align='center' onClick={() => handlePostLike(post._id)}>
					<img src='/images/like.png' alt='Like' />
					<p>{post.likes.length}</p>
				</Flex>
				<Flex align='center'>
					<img src='/images/comment.png' alt='Comment' />
					<p></p>
				</Flex>
				<Flex align='center' onClick={handlePostShare}>
					<img src='/images/share.png' alt='Share' />
					<p>{post && post.shares.length} </p>
				</Flex>
				{/* {post && user && post.user._id === user._id && (
					<>
						<Flex align='center' onClick={handlePostEdit}>
							<img src='/images/edit.png' alt='Edit' />
							<p>Edit</p>
						</Flex>
						<Flex align='center' onClick={() => handlePostDelete(post._id)}>
							<img src='/images/remove.png' alt='Delete' />
							<p>Delete</p>
						</Flex>
					</>
				)} */}
			</Flex>
		</div>
	)
}

export default PostFooter
