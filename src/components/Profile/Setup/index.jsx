import { storage } from '../../../firebase'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../../actions/userActions'
import Alert from '../../UI/Alert'
import Spinner from '../../UI/Spinner'
import Button from '../../UI/Button'
import Flex from '../../UI/Flex'
import Modal from '../../UI/Modal'
import './Setup.scss'
import { USER_UPDATE_CLEAR } from '../../../constants/userConstants'

function Setup({ showModal, customSize, user }) {
	const [isNext, setIsNext] = useState(false)
	const dispatch = useDispatch()

	// Cover photo
	const [cover, setCover] = useState('')
	const [avatar, setAvatar] = useState('')
	const [uploading, setUploading] = useState(false)

	function handleCoverUpload(e) {
		const chosenImage = e.target.files[0]
		setUploading(true)
		const upload = storage.ref(`covers/${chosenImage.name}`).put(chosenImage)
		upload.on(
			'state_changed',
			(snapshot) => {},
			(error) => console.log(error),
			() =>
				storage
					.ref('covers')
					.child(chosenImage.name)
					.getDownloadURL()
					.then((url) => {
						setCover(url)
						setUploading(false)
					})
		)
	}

	function handleAvatarUpload(e) {
		const chosenImage = e.target.files[0]
		setUploading(true)
		const upload = storage.ref(`avatars/${chosenImage.name}`).put(chosenImage)
		upload.on(
			'state_changed',
			(snapshot) => {},
			(error) => console.log(error),
			() =>
				storage
					.ref('avatars')
					.child(chosenImage.name)
					.getDownloadURL()
					.then((url) => {
						setAvatar(url)
						setUploading(false)
					})
		)
	}

	const userUpdate = useSelector((state) => state.userUpdate)
	const { error, success, loading } = userUpdate
	function setupProfileHandler() {
		dispatch(
			updateUser({ profilePhoto: avatar, coverPhoto: cover, _id: user._id })
		)
	}

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_CLEAR })
		}
	}, [success, dispatch])

	return (
		<Modal
			className='setup'
			showModal={showModal}
			title={isNext ? 'Pick a header' : 'Pick a profile picture'}
			customSize={customSize}
		>
			<p className='setup__text'>
				{isNext
					? 'People who visit your profile will see it. Show your style.'
					: 'Have a favorite selfie? Upload it now.'}
			</p>
			{isNext ? (
				<>
					<div className='setup__cover'>
						<label htmlFor='cover'>
							<i
								className='fas fa-camera'
								style={cover ? { marginLeft: -16 } : {}}
							></i>
							<input
								type='file'
								name='cover'
								onChange={handleCoverUpload}
								id='cover'
								className='none'
							/>
						</label>
						{cover && (
							<i onClick={() => setCover('')} className='fas fa-times ml-2'></i>
						)}

						{(user.coverPhoto || cover) && (
							<img src={cover ? cover : user.coverPhoto} alt='user header' />
						)}
					</div>
					<div className='setup__sub-cover'>
						<img src={user.profilePhoto} alt='user avatar' />
						<p>
							{user.firstName} {user.lastName}
						</p>
					</div>
				</>
			) : (
				<div className='setup__avatar'>
					<label htmlFor='avatar'>
						<i
							className='fas fa-camera'
							style={avatar ? { marginLeft: -16 } : {}}
						></i>
						<input
							type='file'
							name='avatar'
							onChange={handleAvatarUpload}
							id='avatar'
							className='none'
						/>
					</label>
					{avatar && (
						<i onClick={() => setAvatar('')} className='fas fa-times ml-2'></i>
					)}

					<img src={avatar ? avatar : user.profilePhoto} alt='user avatar' />
				</div>
			)}
			{(uploading || loading) && (
				<Flex justify='center' className='mb-1'>
					<Spinner />
				</Flex>
			)}
			{error && (
				<Alert className='mb-1' bg='danger'>
					{error}
				</Alert>
			)}
			{success && (
				<Alert className='mb-1' bg='success'>
					Photo uploaded successfullly
				</Alert>
			)}
			<Flex justify='right'>
				{isNext && cover && (
					<Button
						onClick={setupProfileHandler}
						type='button'
						bg='blue'
						className='rounded mb-1'
					>
						Apply
					</Button>
				)}
				{!isNext && avatar && (
					<Button
						onClick={setupProfileHandler}
						type='button'
						bg='blue'
						className='rounded mb-1'
					>
						Apply
					</Button>
				)}

				{isNext ? (
					<Button
						onClick={() => setIsNext(false)}
						type='button'
						bg='red'
						className='rounded mb-1'
					>
						Back
					</Button>
				) : (
					<Button
						onClick={() => setIsNext(true)}
						type='button'
						bg='red'
						className='rounded mb-1'
					>
						Next
					</Button>
				)}
			</Flex>
		</Modal>
	)
}

export default Setup
