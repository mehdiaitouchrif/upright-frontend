import './Flex.scss'

function Flex({ children, align, justify, direction, className }) {
	return (
		<div
			className={`flex flex-align-${align} flex-direction-${direction} flex-justify-${justify} ${className}`}
		>
			{children}
		</div>
	)
}

export default Flex
