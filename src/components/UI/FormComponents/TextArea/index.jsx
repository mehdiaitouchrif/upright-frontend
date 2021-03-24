import './TextArea.scss'
import PropTypes from 'prop-types'

function TextArea({ value, className, onChange, name, placeholder }) {
	return (
		<textarea
			className={`textArea ${className}`}
			onChange={onChange}
			placeholder={placeholder}
			name={name}
			value={value}
		/>
	)
}

TextArea.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
}

export default TextArea
