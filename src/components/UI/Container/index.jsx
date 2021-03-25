import './Container.scss'
import PropTypes from 'prop-types'

function Container({ size, children, className, customSize }) {
	return (
		<div
			style={{ maxWidth: customSize && customSize }}
			className={`container container--${size} ${className}`}
		>
			{children}
		</div>
	)
}

Container.propTypes = {
	size: PropTypes.string,
	customSize: PropTypes.number,
	className: PropTypes.string,
}

export default Container
