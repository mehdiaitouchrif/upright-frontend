import './Button.scss'
import PropTypes from 'prop-types'

function Button({ type, bg, className, onClick, disabled, children }) {
	return (
		<button
			className={`button button--${bg} ${className}`}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	children: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
}

export default Button
