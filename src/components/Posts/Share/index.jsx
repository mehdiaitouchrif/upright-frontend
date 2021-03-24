import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sharePost } from '../../../actions/postActions'
import Modal from '../../UI/Modal'
import TextArea from '../../UI/FormComponents/TextArea'
import './Share.scss'
import Post from '../Post'
import Button from '../../UI/Button'
import Flex from '../../UI/Flex'
import Card from '../../UI/Card'
import Container from '../../UI/Container'

function Share({ post, user, showModal }) {
	const [text, setText] = useState(null)

	const dispatch = useDispatch()

	const sharePostHandler = (postId) => {
		dispatch(sharePost(postId, text))
	}

	return (
		<Modal className='share'>
			<Container size='md'>
				<Card>
					<Flex justify='space-between' align='center'>
						<p className='modal__close' onClick={showModal}>
							&times;
						</p>
					</Flex>
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
				</Card>
			</Container>
		</Modal>
	)
}

export default Share
