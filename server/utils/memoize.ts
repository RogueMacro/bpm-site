function reduce(result: any[]): string {
	return JSON.stringify(result)
}

export function memoize<T extends (...args: any[]) => NonNullable<any>>(
	f: T
): T {
	const memory = new Map<string, ReturnType<T>>()

	const internalFunction = (...args: any[]) => {
		const reductionResult = reduce(args)
		if (!memory.get(reductionResult)) {
			memory.set(reductionResult, f(...args))
		}

		return memory.get(reductionResult)
	}

	return internalFunction as T
}

export function memoizeAsync<
	T extends (...args: any[]) => Promise<NonNullable<any>>
>(f: T) {
	const memory = new Map<string, ReturnType<T>>()

	const internalFunction = (...args: any[]) =>
		new Promise((resolve, reject) => {
			const reductionResult = reduce(args)
			if (!memory.get(reductionResult)) {
				f(...args).then(
					(result) => memory.set(reductionResult, result),
					reject
				)
			}

			resolve(memory.get(reductionResult))
		})

	return internalFunction as T
}

export default memoize
