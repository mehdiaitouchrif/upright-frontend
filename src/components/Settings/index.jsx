import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../actions/authActions'
import { getUser, updateUser, deleteUser } from '../../actions/userActions'
import FormGroup from '../UI/FormComponents/FormGroup'
import TextInput from '../UI/FormComponents/TextInput'
import Grid from '../UI/Grid'
import Flex from '../UI/Flex'
import Alert from '../UI/Alert'
import Spinner from '../UI/Spinner'
import Button from '../UI/Button'
import AppContainer from '../AppContainer'
import './Settings.scss'
import GoBack from '../UI/GoBack'

function Settings({ history, match }) {
	// Current user state
	const currentUser = useSelector((state) => state.currentUser)
	const { loading, user, error } = currentUser

	// User update state
	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: updateLoading,
		success: updateSuccess,
		error: updateError,
	} = userUpdate

	// Password change state
	const passwordChange = useSelector((state) => state.passwordChange)
	const {
		loading: passwordLoading,
		success: passwordSuccess,
		error: passwordError,
	} = passwordChange

	// Forms & values
	const [firstName, setFirstName] = useState(user && user.firstName)
	const [lastName, setLastName] = useState(user && user.lastName)
	const [email, setEmail] = useState(user && user.email)
	const [username, setUsername] = useState(user && user.username)

	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	// Dispatch
	const dispatch = useDispatch()

	// Update user details
	function updateProfile(e) {
		e.preventDefault()

		dispatch(
			updateUser({
				firstName,
				lastName,
				email,
				username,
				_id: user._id,
			})
		)
	}

	// Update password
	function updatePassword(e) {
		e.preventDefault()
		dispatch(changePassword(currentPassword, newPassword))
	}

	// Delete user account
	function deleteAccount() {
		dispatch(deleteUser(user._id))
		window.location.reload()
	}

	useEffect(() => {
		if (!user) {
			dispatch(getUser(match.params.username))
		}
	}, [dispatch, match, history, user])

	return (
		<div className='settings'>
			<AppContainer>
				<div className='settings__content'>
					<GoBack text='Account settings' />

					<div className='settings__body px-1'>
						<form className='settings__form' onSubmit={updateProfile}>
							<Flex align='center' className='my-1'>
								<i className='fas fa-user mr-1'></i>
								<p className='lead'>Account information</p>
							</Flex>
							{error && <Alert bg='danger'>{error}</Alert>}
							{loading && (
								<Flex justify='center' className='my-1'>
									<Spinner />
								</Flex>
							)}
							<FormGroup>
								<Grid cols={2} gap={1}>
									<TextInput
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										name='firstName'
									/>
									<TextInput
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										name='lastName'
									/>
								</Grid>
							</FormGroup>
							<FormGroup>
								<TextInput
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name='email'
								/>
							</FormGroup>
							<FormGroup>
								<TextInput
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									name='username'
								/>
							</FormGroup>
							<Button type='submit' bg='blue' className='rounded my-1'>
								Update informations
							</Button>
							{updateLoading && (
								<Flex justify='center' className='my-1'>
									<Spinner />
								</Flex>
							)}
							{updateSuccess && (
								<Alert className='my-1' bg='success'>
									Informations updated successfully
								</Alert>
							)}
							{updateError && (
								<Alert className='my-1' bg='danger'>
									{updateError}{' '}
								</Alert>
							)}
						</form>

						<Flex align='center' className='my-1'>
							<i className='fas fa-key mr-1'></i>
							<p className='lead'>Change your password</p>
						</Flex>
						<form onSubmit={updatePassword} className='settings__form'>
							<FormGroup>
								<TextInput
									placeholder='Current password'
									value={currentPassword}
									name='currentPassword'
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<TextInput
									placeholder='New password'
									value={newPassword}
									name='newPassword'
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</FormGroup>

							{passwordError && (
								<Alert bg='danger' className='my-1'>
									{passwordError}
								</Alert>
							)}
							{passwordSuccess && (
								<Alert bg='success' className='my-1'>
									Password changed
								</Alert>
							)}
							{passwordLoading && (
								<Flex justify='center' className='my-1'>
									<Spinner />
								</Flex>
							)}
							<Button type='submit' bg='blue' className='rounded mt-1 mb-2'>
								Change password
							</Button>
						</form>
						<Button
							onClick={deleteAccount}
							type='button'
							bg='red'
							className='rounded mb-3'
						>
							Delete my account
						</Button>
					</div>
				</div>
			</AppContainer>
		</div>
	)
}

export default Settings
