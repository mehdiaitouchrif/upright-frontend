import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authActions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Container from '../UI/Container'
import TextInput from '../UI/FormComponents/TextInput'
import Button from '../UI/Button'
import FormGroup from '../UI/FormComponents/FormGroup'
import Grid from '../UI/Grid'
import Card from '../UI/Card'
import Alert from '../UI/Alert'
import Flex from '../UI/Flex'
import Spinner from '../UI/Spinner'
import './Auth.scss'
import SignUp from './SignUp'

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
		dispatch(login({ email, username: email, password }))
	}

	const [isSignUp, setIsSignUp] = useState(false)
	function showModal() {
		setIsSignUp(!isSignUp)
	}

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])
	return (
		<div className='auth'>
			<Container size='md' className='auth__content'>
				<Grid cols={2} gap={2}>
					<div className='auth__side'>
						<h1 className='auth__logo'>Upright</h1>
						<h2 className='auth__heading'>
							Upright helps you connect and share with the people in your life.
						</h2>
					</div>
					<Card>
						<form onSubmit={handleLogin}>
							{error && <Alert bg='danger'>{error}</Alert>}
							<FormGroup>
								<TextInput
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Email or username'
									name='email'
									type='text'
								/>
							</FormGroup>
							<FormGroup>
								<TextInput
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Password'
									name='password'
									type='password'
								/>
							</FormGroup>

							<Button type='submit' bg='red' className='w-full rounded'>
								Login
							</Button>
						</form>
						{loading && (
							<Flex justify='center'>
								<Spinner className='mt-1' />
							</Flex>
						)}

						<Flex justify='center' direction='column'>
							<Link to='/forgotpassword' className='text-center mt-1'>
								Forgot password?{' '}
							</Link>
							<hr className='my-1' />
							<Button
								type='button'
								bg='blue'
								onClick={showModal}
								className='w-full rounded'
							>
								Sign up
							</Button>
						</Flex>
					</Card>
				</Grid>
			</Container>
			{isSignUp && <SignUp showModal={showModal} />}
		</div>
	)
}

Login.propTypes = {
	history: PropTypes.object.isRequired,
}

export default Login
