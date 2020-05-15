import useViewport from './useViewport'

export default (
	width: number,
	height: number,
	operator: 'or' | 'xor' | 'and'
): boolean => {
	const functionOperator = (x: boolean, y: boolean): boolean => {
		switch (operator) {
			case 'or':
				return x || y

			case 'and':
				return x && y

			default:
				return x !== y
		}
	}

	const { vw, vh } = useViewport()

	return functionOperator(width < vw * 100, height < vh * 100)
}
