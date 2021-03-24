import './Edit.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../../actions/postActions'
import Modal from '../../UI/Modal'
import Container from '../../UI/Container'
import Card from '../../UI/Card'
import Flex from '../../UI/Flex'
import TextArea from '../../UI/FormComponents/TextArea'
import Button from '../../UI/Button'

function Edit({ post, showModal }) {
	const [text, setText] = useState('')
	const [image, setImage] = useState('')

	const dispatch = useDispatch()

	function updateHandler() {
		dispatch(updatePost({ text, image, _id: post._id }))
	}

	useEffect(() => {
		if (post) {
			setText(post.text)
			setImage(post.image)
		}
	}, [post])

	return (
		<Modal>
			<Container size='md'>
				<Card>
					<Flex justify='space-between' align='center'>
						<h3 className='tertiary-heading'>Edit your post</h3>
						<p className='modal__close' onClick={showModal}>
							&times;
						</p>
					</Flex>

					<TextArea
						name='text'
						placeholder='Say something!'
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
					{image && (
						<div className='edit__image'>
							<img src={image} alt={image} />
						</div>
					)}
					<Button
						onClick={updateHandler}
						type='submit'
						bg='blue'
						className='rounded'
					>
						Update
					</Button>
				</Card>
			</Container>
		</Modal>
	)
}

export default Edit
