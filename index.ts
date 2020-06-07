import { Application, Request, Response, NextFunction } from 'express'
import Context from './server/typings/context.type'

import _next from 'next'
import {
	initializeApp as initializeFirebaseApp,
	credential,
	firestore,
} from 'firebase-admin'
import { config } from 'dotenv'

import { join } from 'path'
import { parse } from 'url'

import gql from './api/server'

import _renderSSG from './shared/components/ssg/server'
import cookieParse from './shared/components/cookie/server'
import { cacheForQueueAsync } from './server/utils/cache'
import _generate from './server/components/generate.component'
import _getPackage from './server/components/generatePackage.component'

config()

const PORT = process.env.PORT || 8080
const DEV = (process.env.NODE_ENV || 'production') === 'development'

initializeFirebaseApp({
	databaseURL: 'https://bpm-db.firebaseio.com',
	projectId: 'bpm-db',
	storageBucket: 'bpm-db.appspot.com',
	credential: credential.cert(
		JSON.parse(process.env.GOOGLE_CREDENTIAL || '{}') || ''
	),
})

const packages = firestore().collection('packages')

const express = require('express')

const next = _next({
	dev: DEV,
})
const handel = next.getRequestHandler()

const app: Application = express()

app.set('trust proxy', true)

gql.applyMiddleware({ app })

app.get(/\/assets\//, (req, res) => {
	res.sendFile(join(__dirname, parse(req.url).pathname || ''))
	setTimeout(() => res.end(), 100)
})

app.get(/favicon.ico/, (_, res) => res.redirect(303, '/assets/bpm_logo.svg'))

next.prepare().then(() => {
	const ctx: Context = {
		next,
		packages,
	}

	const renderSSG = _renderSSG(ctx)

	const getPackage = cacheForQueueAsync(
		_getPackage(ctx),
		DEV ? 1000 * 60 * 60 : 1000 * 10, // ! TODO: find good time and k values
		100
	)

	app.get(/(package|p)\/[^\/.]*$/s, (req, res) => {
		const packageID = (parse(req.url).pathname || '').split('/').pop()
		if (packageID) {
			getPackage(packageID).then((v) => {
				console.log(v, packageID)

				if (v) {
					renderSSG(req, res, '/package/package', v)
				} else {
					next.render404(req, res)
				}
			})
		} else next.render404(req, res)
	})

	app.get(/.*/s, (req, res) => {
		handel(req, res).then(() => {
			if (!req.url.includes('/_next'))
				console.log(
					`connection to ${req.url} from [ ${[
						req.ip,
						...req.ips,
					].join(' ')} ]`
				)
		})
	})

	app.use(
		(err: Error, req: Request, res: Response, nextF: NextFunction) => {
			next.render(req,res,'/500')
		}
	)

	app.listen(PORT, () => {
		console.log(
			'initialize',
			`server listening on port ${PORT}`,
			'local:networking'
		)
	})
})
