import { Request } from 'express'
import SiteArgs from '../typings/siteArgs.type'

import getFilePathChain from '../utils/getFilePathFromChain'
import { memoizeAsync } from '../utils/memoize'
import { componentize } from 'html-fx'
import isIE from './isIE.component'
import { readFile } from 'fs'

export default memoizeAsync(
	(
		request: Request,
		args: Partial<SiteArgs> = {
			description: '',
			icon: '',
			title: '',
		}
	) =>
		new Promise((resolve, reject) => {
			if (isIE(request.headers['user-agent']))
				resolve(
					componentize.headRender(
						componentize.render('', { '': '' }),
						args
					)
				)
			else {
				getFilePathChain([],'file')
			}
		})
)
