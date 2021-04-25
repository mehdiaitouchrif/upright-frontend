import { storage } from '../../../firebase'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Picker from 'emoji-picker-react'
import { createPost } from '../../../actions/postActions'
import Button from '../../UI/Button'
import Card from '../../UI/Card'
import Flex from '../../UI/Flex'
import './Create.scss'
import Spinner from '../../UI/Spinner'

function Create({ user }) {
	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [uploading, setUploading] = useState(false)

	const [showPicker, setShowPicker] = useState(false)
	const [chosenEmoji, setChosenEmoji] = useState(null)

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject)
		if (chosenEmoji) {
			setText((prev) => `${prev} ${chosenEmoji.emoji}`)
		}
	}

	const dispatch = useDispatch()

	const uploadPhotoHandler = (e) => {
		const chosenImage = e.target.files[0]
		setUploading(true)
		const upload = storage.ref(`posts/${chosenImage.name}`).put(chosenImage)
		upload.on(
			'state_changed',
			(snapshot) => {},
			(error) => console.log(error),
			() =>
				storage
					.ref('posts')
					.child(chosenImage.name)
					.getDownloadURL()
					.then((url) => {
						setImage(url)
						setUploading(false)
					})
		)
	}

	function submitPost(e) {
		e.preventDefault()
		if (image) {
			dispatch(createPost({ text, image }))
		} else if (text.trim() === '') {
			alert("Post can't be empty")
		} else {
			dispatch(createPost({ text }))
		}
		setText('')
		setImage('')
	}

	return (
		<Card className='create my-1'>
			<Flex className='create__upper'>
				<div className='create__user'>
					<img src={user && user.profilePhoto} alt='Test' />
				</div>
				<Flex direction='column' className='w-full'>
					<form onSubmit={submitPost}>
						<textarea
							placeholder="What's happening?"
							name='text'
							className='create__text'
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>
						{showPicker && (
							<div>
								<Picker onEmojiClick={onEmojiClick} />
							</div>
						)}
						<Flex
							justify='space-between'
							align='center'
							className='create__lower'
						>
							<Flex align='center'>
								<label htmlFor='media' className='create__upload'>
									<i className='fas fa-images create__images'></i>
									<input
										onChange={uploadPhotoHandler}
										type='file'
										id='media'
										name='media'
									/>
								</label>
								<p
									onClick={() => setShowPicker(!showPicker)}
									className='create__emoji'
								>
									<i className='far fa-smile-beam'></i>
								</p>
							</Flex>

							{uploading && (
								<Flex justify='center'>
									<Spinner />
								</Flex>
							)}
							<Button type='submit' bg='blue' className='rounded'>
								Post it
							</Button>
						</Flex>
					</form>
				</Flex>
			</Flex>
			{image && (
				<Flex justify='center' align='center'>
					<div className='create__chosen'>
						<img src={image} alt='chosen' />
					</div>
					<div>
						<Button
							onClick={() => setImage('')}
							bg='red'
							className='rounded ml-1'
							type='button'
						>
							Delete image
						</Button>
					</div>
				</Flex>
			)}
		</Card>
	)
}

export default Create
