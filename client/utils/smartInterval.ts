import { v5 } from 'uuid'

const store: {
	[id: string]: {
		isDead: boolean
		start: number
		id: string
	}
} = {}

export const setRInterval = (
	cb: (setNextInterval: (next: number) => void, clear: () => void) => void,
	initialTimeout: number
): string => {
	const cbExec = () => {
		if (!store[id].isDead) {
			let newTime = initialTimeout
			cb(
				(num) => {
					newTime = num
				},
				() => (store[id].isDead = true)
			)
			setTimeout(cbExec, newTime)
		}
	}

	const id = v5(cb.toString(), v5.DNS)

	store[id] = {
		start: Date.now(),
		isDead: false,
		id,
	}

	setTimeout(cbExec, initialTimeout)

	return id
}
export const removeRInterval = (id: string) => (store[id].isDead = true)
