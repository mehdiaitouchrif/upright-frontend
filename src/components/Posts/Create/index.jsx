import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../actions/postActions'
import Button from '../../UI/Button'
import Card from '../../UI/Card'
import Flex from '../../UI/Flex'
import './Create.scss'

function Create() {
	const [text, setText] = useState('')
	const [image, setImage] = useState('')

	const dispatch = useDispatch()

	function submitPost(e) {
		e.preventDefault()
		if (image) {
			dispatch(createPost({ text, image }))
		} else {
			dispatch(createPost({ text }))
		}
	}

	return (
		<Card className='create my-1'>
			<Flex className='create__upper'>
				<img src='/images/profile.webp' alt='Test' />
				<Flex direction='column' className='w-full'>
					<form onSubmit={submitPost}>
						<textarea
							placeholder="What's happening?"
							name='text'
							className='create__text'
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>

						<Flex
							justify='space-between'
							align='center'
							className='create__lower'
						>
							<label htmlFor='media' className='create__upload'>
								<img src='/images/gallery.png' alt='Import media' />
								<input type='file' id='media' name='media' />
							</label>
							<Button type='submit' bg='blue' className='rounded'>
								Post it
							</Button>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Create
