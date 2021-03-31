import Flex from '../Flex'
import './GoBack.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function GoBack({ text }) {
	return (
		<Link to='/' className='back'>
			<Flex align='center'>
				<i className='fas fa-arrow-left mr-1'></i>
				<p>{text}</p>
			</Flex>
		</Link>
	)
}

GoBack.propTypes = {
	text: PropTypes.string,
}

export default GoBack
