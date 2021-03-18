import './Alert.scss'

function Alert({ children, bg, className }) {
	return <div className={`alert alert-${bg} ${className}`}>{children}</div>
}

export default Alert
