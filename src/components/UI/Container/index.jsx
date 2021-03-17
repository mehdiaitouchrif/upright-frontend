import './Container.scss'
import PropTypes from 'prop-types'

function Container({ size, children, className }) {
	return (
		<div className={`container container--${size} ${className}`}>
			{children}
		</div>
	)
}

Container.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
}

export default Container
