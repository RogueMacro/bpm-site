import { useState } from 'react'
import { range } from 'lodash'

export function useRandom() {
	const [n] = useState(Math.random())
	return n
}

export function useRandoms(count: number) {
	const [ns, _] = useState(range(count).map(() => useRandom()))
	return ns
}

export const randomBool = (bias?: number) =>
	Math.round(useRandom() - (bias || 0))

export const anySignRandom = () => (useRandom() - 0.5) * 2
