import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../actions/authActions'
import PropTypes from 'prop-types'

function SignUp({ history }) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userSignUp = useSelector((state) => state.userSignUp)
	const { loading, error, userInfo } = userSignUp

	function handleSignUp(e) {
		e.preventDefault()

		dispatch(signUp({ firstName, lastName, email, username, password }))
	}

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])

	return (
		<div>
			{error && <h1>Error</h1>}
			<form onSubmit={handleSignUp}>
				<input
					type='text'
					value={firstName}
					placeholder='First Name'
					onChange={(e) => setFirstName(e.target.value)}
				/>
				{error && <p>{error.firstName} </p>}
				<input
					type='text'
					value={lastName}
					placeholder='Last Name'
					onChange={(e) => setLastName(e.target.value)}
				/>
				{error && <p>{error.lastName} </p>}
				<input
					type='text'
					value={username}
					placeholder='username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				{error && <p>{error.username} </p>}
				<input
					type='text'
					value={email}
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				{error && <p>{error.email} </p>}
				<input
					type='password'
					value={password}
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <p>{error.password} </p>}
				<button type='submit'>Sign Up</button>
			</form>
			{loading && <h1>Loading...</h1>}
		</div>
	)
}

SignUp.propTypes = {
	history: PropTypes.object.isRequired,
}

export default SignUp
