import * as expressTypes from 'express'

import next from 'next'
import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'
import { join } from 'path'

const PORT = process.env.PORT || 8080

initializeFirebaseApp({
	databaseURL: 'https://bpm-db.firebaseio.com',
	projectId: 'bpm-db',
	storageBucket: 'bpm-db.appspot.com',
})
const express = require('express')

const server: expressTypes.Application = express()
const app = next({
	dev: (process.env.NODE_ENV || 'production') === 'development',
})

const handel = app.getRequestHandler()

// server.set('trust proxy',true)

app.prepare()
	.then(() => {
		server.get(/.*/, (req, res) =>
			handel(req, res).then(() =>
				console.log('sent site to', [req.ip].join(', '))
			)
		)

		server.listen(PORT, () => {
			console.log(
				'initialize',
				`server listening on port ${PORT}`,
				'local:networking'
			)
		})
	})
	.catch((err) => console.log(err))
