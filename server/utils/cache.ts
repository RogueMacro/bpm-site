// import isPromise from 'is-promise'

type cacheable = (...args: any[]) => NonNullable<any>
type asyncCacheable = (...args: any[]) => Promise<NonNullable<any>>

function reduce(result: any[]): string {
	return JSON.stringify(result)
}

// TODO: fix function so that blocking and nonBlocking variants of cache can be called from one function
// function createMaybeAsyncFunction<args extends any[], ret>(
// 	blocking: (f: cacheable, ...args: args) => ret,
// 	nonBlocking: (f: asyncCacheable, ...args: args) => Promise<ret>
// ) {
// 	let isBlocking: boolean

// 	return (f: cacheable | asyncCacheable, ...args: args) => {

// 	}
// }

export function memoize<T extends cacheable>(f: T): T {
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

export function memoizeAsync<T extends asyncCacheable>(f: T) {
	const memory: {
		[key: string]: ReturnType<T>
	} = {}

	const internalFunction = (...args: any[]) =>
		new Promise((resolve, reject) => {
			const reductionResult = reduce(args)
			if (!memory.hasOwnProperty(reductionResult)) {
				f(...args).then((result) => {
					memory[reductionResult] = result
					resolve(result)
				}, reject)
			} else {
				resolve(memory[reductionResult])
			}
		})

	return internalFunction as T
}

// export const memoize = createMaybeAsyncFunction(_memoize, _memoizeAsync)

export function cacheFor<T extends cacheable>(f: T, timeout: number): T {
	const memory: {
		[key: string]: ReturnType<T>
	} = {}

	const out = (...args: any[]) => {
		const reductionResult = reduce(args)

		if (memory.hasOwnProperty(reductionResult))
			return memory[reductionResult]
		const result = f(...args)
		memory[reductionResult] = result

		setTimeout(() => {
			delete memory[reductionResult]
		}, timeout)

		return result
	}
	return out as T
}

export function cacheForAsync<T extends asyncCacheable>(
	f: T,
	timeout: number
): T {
	const memory: {
		[key: string]: ReturnType<T>
	} = {}

	const func = async (...args: any[]) => {
		const reductionResult = reduce(args)

		if (memory.hasOwnProperty(reductionResult))
			return memory[reductionResult]
		const result = await f(...args)
		memory[reductionResult] = result

		setTimeout(() => {
			delete memory[reductionResult]
		}, timeout)

		return result
	}
	return func as T
}

// export const cacheFor = createMaybeAsyncFunction(_cacheFor, _cacheForAsync)

export function cacheForQueue<T extends cacheable>(
	f: T,
	timeout: number,
	k: number
): T {
	const memory: {
		[key: string]: ReturnType<T>
	} = {}
	let discardQueue: string[] = []

	const shift = () => {
		const v = discardQueue.shift()
		if (v) delete memory[v]
	}

	setInterval(() => {
		while (discardQueue.length > k) shift()
		if (discardQueue.length > 1) shift()
	}, timeout)

	const out = (...args: any[]) => {
		const reductionResult = reduce(args)

		if (memory.hasOwnProperty(reductionResult))
			return memory[reductionResult]

		const result = f(...args)
		memory[reductionResult] = result

		discardQueue.push(reductionResult)

		return result
	}

	return out as T
}

export function cacheForQueueAsync<T extends asyncCacheable>(
	f: T,
	timeout: number,
	k: number
): T {
	const memory: {
		[key: string]: ReturnType<T>
	} = {}
	let discardQueue: string[] = []

	const shift = () => {
		const v = discardQueue.shift()
		if (v) delete memory[v]
	}

	setInterval(() => {
		while (discardQueue.length > k) shift()
		if (discardQueue.length > 1) shift()
	}, timeout)

	const out = async (...args: any[]) => {
		const reductionResult = reduce(args)

		if (memory.hasOwnProperty(reductionResult))
			return memory[reductionResult]

		const result = f(...args)
		memory[reductionResult] = await result

		discardQueue.push(reductionResult)

		return result
	}

	return out as T
}

// export function cacheForQueue<T extends cacheable>(
// 	f: T,
// 	timeout: number,
// 	k: number
// ): T {
// 	if(isPromise(f))
// }
