import './Spinner.scss'

function Spinner({ className }) {
	return (
		<div className={`circles-to-rhombuses-spinner ${className}`}>
			<div className='circle'></div>
			<div className='circle'></div>
			<div className='circle'></div>
		</div>
	)
}

export default Spinner
