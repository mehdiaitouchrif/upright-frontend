import './Flex.scss'

function Flex({ children, align, justify, className }) {
	return (
		<div
			className={`flex flex-align-${align} flex-justify-${justify} ${className}`}
		>
			{children}
		</div>
	)
}

export default Flex
