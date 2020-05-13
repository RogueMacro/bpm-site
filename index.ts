import * as expressTypes from 'express'

import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'

import generate from './server/components/generate.component'

const PORT = process.env.PORT || 8080

initializeFirebaseApp({
	databaseURL: 'https://bpm-db.firebaseio.com',
	projectId: 'bpm-db',
	storageBucket: 'bpm-db.appspot.com',
})
const express = require('express')

const app: expressTypes.Application = express()

app.set('trust proxy', true)

app.get(/.*/, (req, res) =>
	generate({ url: req.url, userAgent: req.headers['user-agent'] }).then(
		(value) => {
			if (value) res.send(value)
		}
	)
)

app.listen(PORT, () => {
	console.log(
		'initialize',
		`server listening on port ${PORT}`,
		'local:networking'
	)
})
