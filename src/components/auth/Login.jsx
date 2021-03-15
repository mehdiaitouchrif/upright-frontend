import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authActions'
import PropTypes from 'prop-types'

function Login({ history }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	// Login form submission
	function handleLogin(e) {
		e.preventDefault()

		console.log({ email, password })
		dispatch(login({ email, password }))
	}

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])

	return (
		<div>
			{error && <h2>{error} </h2>}
			<form onSubmit={handleLogin}>
				<input
					type='text'
					value={email}
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					value={password}
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
			{loading && <h1>Loading...</h1>}
		</div>
	)
}

Login.propTypes = {
	history: PropTypes.object.isRequired,
}

export default Login
