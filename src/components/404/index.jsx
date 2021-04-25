import { Link } from 'react-router-dom'
import Meta from '../Meta/Meta'
import './404.scss'

function NotFound() {
	return (
		<div className='_404'>
			<Meta title="Page isn't available | Upright" />
			<h1 className='primary-heading '>Sorry, this page doesn't exist</h1>
			<Link className='_404__link' to='/'>
				Go Home
			</Link>
			<div className='_404__image'>
				<img src='/images/404.svg' alt='Not found' />
			</div>
		</div>
	)
}

export default NotFound
