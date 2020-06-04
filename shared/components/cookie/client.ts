import { omit, kebabCase } from 'lodash'

import CookieBaseline from '../../typings/baseline.type'

interface CookieArgs {
	path?: string
	domain?: string
	maxAge?: number
	expires?: Date
	secure?: boolean
	sameSite?: 'Strict' | 'Lax'
}
interface Cookie {
	content: any
	meta: Omit<CookieArgs, 'expires'>
}

interface WriteCookie extends Cookie {
	meta: Partial<Cookie['meta'] & { expires: number }>
}

interface ReadCookie extends Cookie {
	meta: Partial<CookieArgs>
}

class CookieHandler<T extends CookieBaseline> {
	constructor() {}

	private encodeKey = encodeURIComponent

	private encodeContent = (content: WriteCookie): string =>
		encodeURIComponent(JSON.stringify(content))
	private decodeContent = (content: string): ReadCookie =>
		JSON.parse(decodeURIComponent(content))

	private makeCookie(key: string, value: any, args?: CookieArgs) {
		const simpleArgs = args ? omit(args, 'expires') : {}
		return `${this.encodeKey(key)}=${this.encodeContent({
			content: value,
			meta: {
				...simpleArgs,
				...(args?.hasOwnProperty('encode')
					? { expires: args?.expires?.getTime() }
					: {}),
			},
		})}${
			simpleArgs
				? `;${Object.entries(simpleArgs)
						.map(([key, value]) => `${kebabCase(key)}=${value}`)
						.join(';')}`
				: ''
		}${args?.expires ? `;expires=${args.expires.toUTCString()}` : ''}`
	}

	private writeCookie(key: string, value: string, args?: CookieArgs) {
		document.cookie = this.makeCookie(key, value, args)
	}

	private readCookie(key: string) {}
}

export default CookieHandler
