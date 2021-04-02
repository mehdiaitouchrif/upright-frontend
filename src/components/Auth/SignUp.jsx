import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../actions/authActions'
import TextInput from '../UI/FormComponents/TextInput'
import Button from '../UI/Button'
import FormGroup from '../UI/FormComponents/FormGroup'
import Modal from '../UI/Modal'
import Alert from '../UI/Alert'
import Flex from '../UI/Flex'
import Spinner from '../UI/Spinner'
import './Auth.scss'
import PropTypes from 'prop-types'

function SignUp({ showModal, title, customSize }) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userSignUp = useSelector((state) => state.userSignUp)
	const { loading, error } = userSignUp

	function handleSignUp(e) {
		e.preventDefault()

		dispatch(signUp({ firstName, lastName, email, username, password }))
	}

	return (
		<Modal title={title} customSize={customSize} showModal={showModal}>
			<form onSubmit={handleSignUp}>
				{error && error.firstName && (
					<Alert bg='danger'>{error.firstName} </Alert>
				)}
				<FormGroup>
					<TextInput
						type='text'
						value={firstName}
						placeholder='First Name'
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</FormGroup>
				{error && error.lastName && (
					<Alert bg='danger'>{error.lastName} </Alert>
				)}
				<FormGroup>
					<TextInput
						type='text'
						value={lastName}
						placeholder='Last Name'
						onChange={(e) => setLastName(e.target.value)}
					/>
				</FormGroup>

				{error && error.username && (
					<Alert bg='danger'>{error.username} </Alert>
				)}
				<FormGroup>
					<TextInput
						type='text'
						value={username}
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormGroup>
				{error && error.email && <Alert bg='danger'>{error.email} </Alert>}
				<FormGroup>
					<TextInput
						type='email'
						value={email}
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormGroup>
				{error && error.password && (
					<Alert bg='danger'>{error.password} </Alert>
				)}
				<FormGroup>
					<TextInput
						type='password'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				<Button type='submit' bg='red' className='w-full rounded mb-1'>
					Sign up
				</Button>
			</form>
			{loading && (
				<Flex justify='center'>
					<Spinner className='mb-1' />
				</Flex>
			)}
		</Modal>
	)
}

SignUp.propTypes = {
	showModal: PropTypes.bool,
}

export default SignUp
