interface _JSONObject {
	[key: string]: JSONObject
}

type JSONObject = _JSONObject | number | string | null | boolean | JSONObject[]

interface StorageBaseline {
	[key: string]: any
}

export default class StorageHandler<schema extends StorageBaseline> {
	private storage: Storage
	constructor(storage: Storage) {
		this.storage = storage
	}

	private parseItem(item: keyof schema): string {
		return `${item}`
	}

	setItem<key extends keyof schema>(item: key, value: schema[key]): void {
		this.storage.setItem(this.parseItem(item), JSON.stringify(value))
	}

	getItem<key extends keyof schema>(item: key): Readonly<schema[key] | null> {
		if (this.isItem(item)) {
			return JSON.parse(
				this.storage.getItem(this.parseItem(item)) || 'null'
			)
		} else {
			return null
		}
	}

	isItem<key extends keyof schema>(item: key): Readonly<boolean> {
		return this.storage.getItem(this.parseItem(item)) !== null
	}

	void(): void {
		this.storage.clear()
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
