export interface CookieArgs {
	path: string
	domain?: string
	maxAge: number
	expires?: Date
	secure: boolean
	sameSite: 'Strict' | 'Lax' | 'None'
}
interface Cookie {
	content: any
	meta: any
}
export interface WriteCookie extends Cookie {
	meta: string
}
export interface ReadCookie extends Cookie {
	meta: Partial<CookieArgs>
}
