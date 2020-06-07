import { kebabCase } from 'lodash'

import CookieBaseline from '../../typings/baseline.type'
import { CookieArgs } from '../../typings/cookie.type'
import { encodeContent } from './codec'

const makeCookieArgs = ({
	expires,
	secure,
	...simpleArgs
}: Partial<CookieArgs>) =>
	`${
		simpleArgs
			? `; ${Object.entries(simpleArgs)
					.map(([key, value]) => `${kebabCase(key)}=${value}`)
					.join('; ')}`
			: ''
	}${expires ? `; expires=${expires.toUTCString()}` : ''}${
		secure ? '; Secure' : ''
	}`

class MetaCookieHandler<T extends CookieBaseline> {
	private encodeKey = encodeURIComponent

	private makeCookie(key: string, value: any, args?: CookieArgs) {
		const strArgs = makeCookieArgs(args || {})
		return `${this.encodeKey(key)}=${encodeContent({
			content: value,
			meta: strArgs,
		})}${strArgs}`
	}

	get cookie() {
		return document.cookie
			.split(';')
			.map((v) => v.split('='))
			.reduce((acc: any, v) => {
				acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
					v[1].trim()
				)
				return acc
			}, {})
	}

	private writeCookie(key: string, value: string, args?: CookieArgs) {
		document.cookie = this.makeCookie(key, value, args)
	}

	getCookie<arg extends keyof T>(key: arg): T[arg] {
		return this.cookie[key]
	}
	setCookie<arg extends keyof T>(key: arg, value: T[arg], args?: CookieArgs) {
		this.writeCookie(key as string, value, args)
	}
}

class CookieHandler<T extends string | string> {
	constructor() {}

	private makeCookie(
		key: string,
		value: any,
		args: CookieArgs = {
			domain: location.hostname,
			path: location.pathname,
			maxAge: 60 * 60 * 24 * 100,
			sameSite: 'Strict',
			secure: true,
		}
	) {
		return `${encodeURIComponent(key)}=${encodeURIComponent(
			value
		)}${makeCookieArgs(args)};`
	}

	get cookie(): { [key in T]: string } {
		return Object.fromEntries(
			document.cookie
				.split(';')
				.map((v) => v.split('=').map(decodeURIComponent))
		)
	}

	getCookie(key: T): string {
		return this.cookie[key]
	}
	setCookie(key: T, value: string, args?: CookieArgs) {
		const cookie = this.makeCookie(`${key}`, value, args)
		document.cookie = cookie
	}
	delCookie(key: T, path: string, domain: string = location.origin) {
		document.cookie = this.makeCookie(`${key}`, '', {
			expires: new Date(0),
			path,
			domain,
			maxAge: 0,
			sameSite: 'None',
			secure: false,
		})
	}
}

export default CookieHandler
