import { WriteCookie, ReadCookie } from '../../typings/cookie.type'
import { Request } from 'express'

import { omit, kebabCase } from 'lodash'

import { CookieArgs } from '../../typings/cookie.type'

const cookieHeader = encodeURIComponent('!SUPER:COOKIE!')

export const encodeContent = (content: WriteCookie): string =>
	cookieHeader + encodeURIComponent(JSON.stringify(content))

export const decodeContent = (content: string): ReadCookie | string => {
	if (content.startsWith(cookieHeader)) {
		const cookieContent: WriteCookie = JSON.parse(
			decodeURIComponent(content.replace(cookieHeader, ''))
		)
		return {
			content: cookieContent.content,
			meta: cookieContent.meta,
		} as ReadCookie
	}
	return decodeURIComponent(content)
}

export const parseCookieString = (req: Request | string) =>
	(typeof req === 'object' ? req.headers.cookie || '' : req)
		.split(/;/g)
		.reduce((prev: { [key: string]: ReadCookie | string }, str) => {
			const [key, value] = str.split('=').map((s) => s.trim())
			if (key && value)
				prev[decodeURIComponent(key)] = decodeContent(value)
			return prev
		}, {})

// ! ERR HERE SOMEWHERE
// export const makeCookie = (key: string, value: any, args?: CookieArgs) => {
// 	const simpleArgs = args ? omit(args, 'expires') : {}
// 	return `${encodeURIComponent(key)}=${
// 		encodeContent({
// 		content: value,
// 		meta: {
// 			...simpleArgs,
// 			...(
// 				args?.hasOwnProperty('encode')
// 				? { expires: args?.expires?.getTime() }
// 				: {}),
// 		},
// 	})
// }${
// 		simpleArgs
// 			? `;${Object.entries(simpleArgs)
// 					.map(([key, value]) => `${kebabCase(key)}=${value}`)
// 					.join(';')}`
// 			: ''
// 	}${args?.expires ? `;expires=${args.expires.toUTCString()}` : ''}`
// }
