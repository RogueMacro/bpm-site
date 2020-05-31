import { logarithm as log, round } from './math'

export default (byteSize: number) => {
	switch (Math.floor(log(byteSize, 1000))) {
		case 0:
			return `${byteSize}b`

		case 1:
			return `${round(byteSize / 1000, 1)} kb`

		case 2:
			return `${round(byteSize / 1000 ** 2, 1)} mb`

		case 3:
			return `${round(byteSize / 1000 ** 3, 1)} gb`

		case 4:
			return `${round(byteSize / 1000 ** 4, 1)} tb`

		default:
			return byteSize
	}
}
