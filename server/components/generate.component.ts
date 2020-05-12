import { Request } from 'express'
import SiteArgs from '../typings/siteArgs.type'

import { componentize } from 'html-fx'
import isIE from './isIE.component'
import { readFile } from 'fs'

export default (request: Request, args: Partial<SiteArgs>) =>
	new Promise((resolve, reject) => {
		if (isIE(request.headers['user-agent'])) {
			resolve(componentize.htmlConstructor.render('', { '': '' }))
		}
	})
