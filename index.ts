import * as expressTypes from 'express'

import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'
import { join } from 'path'

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
	
)

app.listen(PORT, () => {
	console.log(
		'initialize',
		`server listening on port ${PORT}`,
		'local:networking'
	)
})
