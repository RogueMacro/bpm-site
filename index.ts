import * as expressTypes from 'express'
import * as staticProps from './global/typings/props'

import _next from 'next'
import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'

import { join } from 'path'
import { parse } from 'url'

import gql from './api/server'
import _generate from './server/components/generate.component'

const PORT = process.env.PORT || 8080

initializeFirebaseApp({
	databaseURL: 'https://bpm-db.firebaseio.com',
	projectId: 'bpm-db',
	storageBucket: 'bpm-db.appspot.com',
})

const root = join(__dirname, 'out')

const express = require('express')

const next = _next({
	dev: (process.env.NODE_ENV || 'production') === 'development',
})
const handel = next.getRequestHandler()

const app: expressTypes.Application = express()

app.set('trust proxy', true)

gql.applyMiddleware({ app })

app.get(/\/assets\//, (req, res) => {
	res.sendFile(join(__dirname, parse(req.url).pathname))
	setTimeout(() => res.end(), 100)
})

app.get(/favicon.ico/, (_, res) => res.redirect(303, '/assets/bpm_logo.svg'))

next.prepare().then(() => {
	app.get(/(package|p)\/.*/s, (req, res) => {
		const url = parse(req.url)
		const payload: staticProps.Project = {
			title: url.pathname,
			author: 'string',
			downloads: {
				total: 0,
				monthly: 0,
				weekly: 0,
				daily: 0,
			},
			repo: 'string',
			readMe: 'string',
		}

		next.render(req, res, '/package/package', {
			payload: JSON.stringify(payload),
		})
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

	app.listen(PORT, () => {
		console.log(
			'initialize',
			`server listening on port ${PORT}`,
			'local:networking'
		)
	})
})
