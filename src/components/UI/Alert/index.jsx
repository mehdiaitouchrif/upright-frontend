import { useRef } from 'react'
import Flex from '../Flex'
import './Alert.scss'

function Alert({ children, bg, className }) {
	const alertContainer = useRef(null)

	function clearAlert() {
		alertContainer.current.style.display = 'none'
	}

	return (
		<div ref={alertContainer} className='alert'>
			<Flex
				align='center'
				justify='space-between'
				className={`alert alert-${bg} ${className}`}
			>
				<p>{children}</p>
				<p className='alert__close' onClick={clearAlert}>
					&times;
				</p>
			</Flex>
		</div>
	)
}

export default Alert
