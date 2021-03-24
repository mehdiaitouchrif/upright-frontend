import './PostFooter.scss'
import Grid from '../../../UI/Grid'
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
		<Grid
			cols={user && user._id === post.user._id ? 5 : 3}
			className='post__tools'
		>
			<Flex align='center'>
				<img src='/images/like.png' alt='Like' />
				<p onClick={() => handlePostLike(post._id)}>{post.likes.length}</p>
			</Flex>
			<Flex align='center'>
				<img src='/images/comment.png' alt='Comment' />
				<p></p>
			</Flex>
			<Flex align='center'>
				<img src='/images/share.png' alt='Share' />
				<p onClick={handlePostShare}>{post && post.shares.length} </p>
			</Flex>
			{post && user && post.user._id === user._id && (
				<>
					<Flex align='center'>
						<img src='/images/edit.png' alt='Edit' />
						<p onClick={handlePostEdit}>Edit</p>
					</Flex>
					<Flex align='center'>
						<img src='/images/remove.png' alt='Delete' />
						<p onClick={() => handlePostDelete(post._id)}>Delete</p>
					</Flex>
				</>
			)}
		</Grid>
	)
}

export default PostFooter
