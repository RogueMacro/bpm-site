import SiteArgs from '../typings/siteArgs.type'

import { componentize } from 'html-fx'
import { readFile, realpath } from 'fs'
import { parse } from 'url'
import { join } from 'path'

import _getFilePathChain from '../utils/getFilePathFromChain'
import { memoizeAsync } from '../utils/memoize'
import isIE from './isIE.component'

const getFilePathChain = memoizeAsync(_getFilePathChain)
const root = join(__dirname, '../../out')

export default (
	request: { url: string; userAgent: string },
	args: Partial<SiteArgs> = {
		description: '',
		icon: '',
		title: '',
	}
): Promise<null | string> =>
	new Promise((resolve, reject) => {
		if (isIE(request.userAgent))
			resolve(
				componentize.headRender(
					componentize.render('', { '': '' }),
					args
				)
			)
		else {
			const path = join(root, parse(request.url).pathname)

			getFilePathChain(
				[
					path,
					path + '.html',
					path + '.htm',
					path + 'index.html',
					join(path, '/index.html'),
					join(path, '/index.htm'),
					// root + '/404.html',
				],
				'file'
			).then((fPath) =>
				fPath !== null
					? readFile(fPath, (err, data) => {
							if (err) reject(err)
							else resolve(data.toString())
					  })
					: resolve(null)
			)
		}
	})
