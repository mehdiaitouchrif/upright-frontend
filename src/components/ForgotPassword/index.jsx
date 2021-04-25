import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	login,
	requestPasswordReset,
	resetPassword,
} from '../../actions/authActions'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Flex from '../UI/Flex'
import Container from '../UI/Container'
import FormGroup from '../UI/FormComponents/FormGroup'
import TextInput from '../UI/FormComponents/TextInput'
import Alert from '../UI/Alert'
import Spinner from '../UI/Spinner'
import Meta from '../Meta/Meta'
import './ForgotPassword.scss'

function ForgotPassword({ history }) {
	// Nav authentication
	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	// Search username
	const [username, setUsername] = useState('')

	// New password / Confirm new password
	const [newPassword, setNewPassword] = useState('')
	const [resetToken, setResetToken] = useState('')

	// User Info state
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo, error: loginError } = userLogin

	// Search email / Request password reset state
	const resetRequest = useSelector((state) => state.resetRequest)
	const {
		error: resetRequestError,
		success: resetRequestSuccess,
		loading: resetRequestLoading,
	} = resetRequest

	// Reset state
	const passwordReset = useSelector((state) => state.passwordReset)
	const {
		loading: resetLoading,
		error: resetError,
		success: resetSuccess,
	} = passwordReset

	const dispatch = useDispatch()

	function loginHandler(e) {
		e.preventDefault()
		dispatch(login({ email: loginEmail, password: loginPassword }))
		if (!loginError) {
			setLoginEmail('')
			setLoginPassword('')
		}
	}

	function resetRequestHandler(e) {
		e.preventDefault()
		dispatch(requestPasswordReset(username))
	}

	function resetPasswordHandler(e) {
		e.preventDefault()
		dispatch(resetPassword(newPassword, resetToken))
	}

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])

	return (
		<div className='forgot-password'>
			<Meta title="Forgotten Password | Can't Login | Upright" />
			<Flex
				align='center'
				justify='space-between'
				className='forgot-password__nav'
			>
				<a href='/login' className='forgot-password__logo'>
					Upright
				</a>
				<form onSubmit={loginHandler}>
					<Flex align='center'>
						<TextInput
							value={loginEmail}
							placeholder='Email or username'
							name='authEmail'
							type='email'
							className={`mr-1 ${
								loginError && loginEmail === '' && 'forgot-password__error'
							}`}
							onChange={(e) => setLoginEmail(e.target.value)}
						/>
						<TextInput
							value={loginPassword}
							placeholder='Password'
							name='authPassword'
							type='password'
							className={`mr-1 ${
								loginError && loginEmail === '' && 'forgot-password__error'
							}`}
							onChange={(e) => setLoginPassword(e.target.value)}
						/>
						<Button type='submit' bg='red' className='rounded'>
							Login
						</Button>
					</Flex>
				</form>
			</Flex>
			<Container size='sm' className='forgot-password__main'>
				{resetRequestSuccess && (
					<Alert bg='success' className='forgot-password__alert mb-1'>
						Success! An email has been sent to you
					</Alert>
				)}
				{resetSuccess && (
					<Alert bg='success' className='forgot-password__alert mb-1'>
						Password changed successfully. Back to <a href='/login'>Login</a>
					</Alert>
				)}
				<Card>
					{resetRequestSuccess ? (
						<form onSubmit={resetPasswordHandler}>
							<FormGroup>
								<TextInput
									value={resetToken}
									placeholder='Reset token'
									type='text'
									name='resetToken'
									onChange={(e) => setResetToken(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<TextInput
									value={newPassword}
									placeholder='New password'
									type='password'
									name='newPassword'
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</FormGroup>
							{resetLoading && (
								<Flex justify='center' className='mt-1'>
									<Spinner />
								</Flex>
							)}

							{resetError && (
								<Alert bg='danger' className='my-1'>
									Invalid reset token
								</Alert>
							)}

							<Button type='submit' bg='red' className='rounded'>
								Change password
							</Button>
						</form>
					) : (
						<form onSubmit={resetRequestHandler}>
							<h2 className='secondary-heading'>Find Your Account</h2>
							<p>Please enter your email to search for your account</p>

							<FormGroup>
								<TextInput
									value={username}
									placeholder='Username'
									type='text'
									name='username'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</FormGroup>
							{resetRequestLoading && (
								<Flex justify='center'>
									<Spinner />
								</Flex>
							)}
							{resetRequestError && (
								<Alert bg='danger' className='mb-1 forgot-password__alert'>
									Sorry, we couldn't find any account with this username.
								</Alert>
							)}
							<Button type='submit' bg='blue' className='rounded'>
								Search
							</Button>
						</form>
					)}
				</Card>
			</Container>

			<footer className='forgot-password__footer'>
				<p>Upright &copy;2021</p>
			</footer>
		</div>
	)
}

export default ForgotPassword
