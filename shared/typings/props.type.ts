export type SsrSsgProps<T extends object, Q = any> = { query: Q } & Partial<T>

export interface Project {
	title: string
	name: string
	creator: string
	downloads: {
		total: number
		monthly: number
		weekly: number
		daily: number
	}
	repo: string
	readMe: string
	size: number
	version: string
}
