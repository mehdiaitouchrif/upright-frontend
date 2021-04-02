import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'
import Flex from '../UI/Flex'
import Modal from '../UI/Modal'
import Create from '../Posts/Create'
import './Navigation.scss'

function Navigation({ logout, user }) {
	const [active, setActive] = useState('home')

	const [isCreate, setIsCreate] = useState(false)
	function showModal() {
		setIsCreate(!isCreate)
	}

	return (
		<div className='nav'>
			<div className='nav__content'>
				<Link
					to='/'
					className={`nav__item ${active === 'home' && 'active'}`}
					onClick={() => setActive('home')}
				>
					<Flex align='center'>
						<i className='fas fa-home mr-1'></i>
						<p>Home</p>
					</Flex>
				</Link>
				<Link
					to={user && `/@${user.username}`}
					className={`nav__item ${active === 'profile' && 'active'}`}
					onClick={() => setActive('profile')}
				>
					<Flex align='center'>
						<i className='fas fa-user mr-1'></i>
						<p>Profile</p>
					</Flex>
				</Link>
				<Link
					to={user && `/@${user.username}/settings`}
					className={`nav__item ${active === 'settings' && 'active'}`}
					onClick={() => setActive('settings')}
				>
					<Flex align='center'>
						<i className='fas fa-cog mr-1'></i>
						<p>Settings</p>
					</Flex>
				</Link>
				<div className='mt-2'>
					<Button
						type='button'
						bg='blue'
						className='rounded'
						onClick={showModal}
					>
						<Flex align='center'>
							<i className='fas fa-plus mr-1'></i>
							<p>New Post</p>
						</Flex>
					</Button>
				</div>
				<div className='mt-1'>
					<Button onClick={logout} type='button' bg='red' className='rounded'>
						<Flex align='center'>
							<i className='fas fa-sign-out-alt mr-1'></i>
							<p>Logout</p>
						</Flex>
					</Button>
				</div>
			</div>
			{isCreate && (
				<Modal showModal={showModal} customSize={700} title='Create post'>
					<Create />
				</Modal>
			)}
		</div>
	)
}

export default Navigation
