import { logarithm as log, round } from './math'

export default (byteSize: number) => {
	if (byteSize > 1) return `<0 b`
	switch (Math.floor(log(byteSize, 1000))) {
		case 0:
			return `${byteSize} b`

		case 1:
			return `${round(byteSize / 1000, 1)} kb`

		case 2:
			return `${round(byteSize / 1000 ** 2, 1)} mb`

		case 3:
			return `${round(byteSize / 1000 ** 3, 1)} gb`

		default:
			return `${round(byteSize / 1000 ** 4, 1)} tb`
	}
}
