import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sharePost } from '../../../actions/postActions'
import Modal from '../../UI/Modal'
import TextArea from '../../UI/FormComponents/TextArea'
import './Share.scss'
import Post from '../Post'
import Button from '../../UI/Button'

function Share({ post, user, showModal, customSize, title }) {
	const [text, setText] = useState(null)

	const dispatch = useDispatch()

	const sharePostHandler = (postId) => {
		dispatch(sharePost(postId, text))
	}

	return (
		<Modal
			className='share'
			showModal={showModal}
			customSize={customSize}
			title={title}
		>
			<TextArea
				placeholder='Want to say something?'
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>

			<Post post={post} user={user} showFooter={false} />
			<Button
				onClick={() => sharePostHandler(post._id)}
				type='button'
				bg='blue'
				className='rounded'
			>
				Re-Post
			</Button>
		</Modal>
	)
}

export default Share
