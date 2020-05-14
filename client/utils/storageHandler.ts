interface _JSONObject {
	[key: string]: JSONObject
}

type JSONObject = _JSONObject | number | string | null | boolean | JSONObject[]

interface StorageBaseline {
	[key: string]: any
}

export default class StorageHandler<schema extends StorageBaseline> {
	private parseItem(item: keyof schema): string {
		return `${item}`
	}

	setItem<key extends keyof schema>(item: key, value: schema[key]): void {
		window.localStorage.setItem(this.parseItem(item), JSON.stringify(value))
	}

	getItem<key extends keyof schema>(item: key): Readonly<schema[key] | null> {
		if (this.isItem(item)) {
			return JSON.parse(
				window.localStorage.getItem(this.parseItem(item)) || "null"
			)
		} else {
			return null
		}
	}

	isItem<key extends keyof schema>(item: key): Readonly<boolean> {
		return window.localStorage.getItem(this.parseItem(item)) !== null
	}

	void(): void {
		window.localStorage.clear()
	}

	setDefault<key extends keyof schema>(
		item: key,
		value: schema[key]
	): Readonly<boolean> {
		if (!this.isItem(item)) {
			this.setItem(item, value)
			return true
		}
		return false
	}
}
