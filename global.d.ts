declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'testing'
		GOOGLE_CREDENTIAL: string
		PORT?: number
		GITHUB_TOKEN: string
	}
}
