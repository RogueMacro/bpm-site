function objectFromMatrix<T2>(matrix: [any, T2][]): { [propname: string]: T2 } {
	const internalObject = {}

	matrix.forEach(([key, value]: [any, any]) => (internalObject[key] = value))

	return internalObject
}

const functionalObject = {
	map(object: object, func: (obj: any, key?: any) => any) {
		return objectFromMatrix(
			Object.entries(object).map(([key, value]) => [
				key,
				func(value, key),
			])
		)
	},
	filter(object: object, func: (obj: any, key?: any) => Boolean) {
		return objectFromMatrix(
			Object.entries(object).filter(([key, value]) => func(value, key))
		)
	},
	reduce(object: object, func) {
		return Object.entries(object).reduce(([key, value]) => func(value, key))
	},
	mapRecursively(object: object, func) {
		return objectFromMatrix(
			Object.entries(object).map(([key, value]) => {
				if (typeof value === 'object' && !Array.isArray(value)) {
					return [key, this.mapRecursively(value, func)]
				} else {
					return [key, func(value, key)]
				}
			})
		)
	},
	filterRecursively(object: object, func: (...args: any) => any) {
		console.log(
			this.filter(
				object,
				(value) => typeof value === 'object' && !Array.isArray(value)
			)
		)

		return {
			...this.filter(
				this.filter(
					object,
					(value) => typeof value !== 'object' || Array.isArray(value)
				),
				(value) => func(value)
			),
			// ...this.filter(object,value=>typeof value === 'object' && !Array.isArray(value))
		}
	},
}

const isObj = (obj) => typeof obj === 'object' && !Array.isArray(obj)

function mapTo(
	origin: object,
	map: object,
	{ showUndifined = false }: { showUndifined?: Boolean } = {}
) {
	const output = {}

	for (let key in map) {
		let value = map[key]
		let originValue = origin[key]

		if (originValue !== undefined) {
			if (isObj(value) && isObj(originValue)) {
				output[key] = mapTo(originValue, value, { showUndifined })
			} else {
				output[key] = originValue
			}
		} else if (showUndifined) {
			if (isObj(value)) {
				output[key] = mapTo({}, value, { showUndifined })
			} else {
				output[key] = undefined
			}
		}
	}
	return output
}

export type Merge<T1, T2> = {
	[key in keyof Omit<T1, keyof T2>]: T1[key]
} &
	{
		[key in keyof Omit<T2, keyof T1>]: T2[key]
	} &
	{
		[key in Extract<keyof T1, keyof T2>]: T1[key] extends Object
			? T2[key] extends Object
				? Merge<T1[key], T2[key]>
				: T2[key]
			: T2[key]
	}

function merge<T1, T2>(obj1: T1, obj2: T2): Merge<T1, T2> {
	const output: Partial<Merge<T1, T2>> = {}

	for (const key of [...Object.keys(obj1), ...Object.keys(obj2)]) {
		if (isObj(obj1[key]) && isObj(obj2[key])) {
			output[key] = merge(obj1[key], obj2[key])
		} else {
			const value1 = obj1[key]
			output[key] = value1 !== undefined ? value1 : obj2[key]
		}
	}
	return output as Merge<T1, T2>
}

export default {
	merge,
	mapTo,
	functionalObject,
	objectFromMatrix,
}

export { merge, mapTo, functionalObject, objectFromMatrix }
