import './Grid.scss'
import PropTypes from 'prop-types'

function Grid({ children, cols, gap, className, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`grid grid-cols-${cols} grid-gap-${gap} ${className}`}
		>
			{children}
		</div>
	)
}

Grid.propTypes = {
	cols: PropTypes.number,
	gap: PropTypes.number,
	className: PropTypes.string,
}

export default Grid
