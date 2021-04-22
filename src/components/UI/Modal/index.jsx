import Card from '../Card'
import Flex from '../Flex'
import Container from '../Container'
import './Modal.scss'

function Modal({ children, className, showModal, title, customSize }) {
	return (
		<div className={`modal ${className}`}>
			<Container customSize={customSize}>
				<Card className='modal__content'>
					<Flex className='modal__head' justify='space-between' align='center'>
						<h2 className='secondary-heading'>{title}</h2>
						<p className='modal__close' onClick={showModal}>
							&times;
						</p>
					</Flex>
					<div className='modal__body'>{children}</div>
				</Card>
			</Container>
		</div>
	)
}

export default Modal
