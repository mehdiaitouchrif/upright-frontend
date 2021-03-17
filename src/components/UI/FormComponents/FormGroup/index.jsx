import './FormGroup.scss'
import PropTypes from 'prop-types'

function FormGroup({ children, className }) {
	return <div className={`form-group ${className}`}>{children}</div>
}

FormGroup.propTypes = {
	className: PropTypes.string,
}

export default FormGroup
