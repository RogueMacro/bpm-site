import SiteArgs from '../typings/siteArgs.type'

import { componentize } from 'html-fx'
import { readFile, realpath } from 'fs'
import { parse } from 'url'
import { join } from 'path'

import _getFilePathChain from '../utils/getFilePathFromChain'
import { memoizeAsync } from '../utils/memoize'
import isIE from './isIE.component'

const getFilePathChain = memoizeAsync(_getFilePathChain)

export default (resolver: (path: string) => Promise<string>) =>
	memoizeAsync(
		(
			request: { url: string; userAgent: string },
			args: Partial<SiteArgs> = {
				description: '',
				icon: '',
				title: '',
			}
		): Promise<[null | string, string]> =>
			new Promise((resolve, reject) => {
				if (isIE(request.userAgent))
					resolve([
						componentize.headRender(
							componentize.render('', { '': '' }),
							args
						),
						request.url,
					])
				else
					resolver(request.url).then(
						(fPath) =>
							fPath !== null
								? readFile(fPath, (err, data) => {
										if (err) reject(err)
										else resolve([data.toString(), fPath])
								  })
								: resolve([null, fPath]),
						console.error
					)
			})
	)
