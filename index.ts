import * as expressTypes from 'express'

import next from 'next'
import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'
import { join } from 'path'

const PORT = process.env.PORT || 8080

initializeFirebaseApp({
	databaseURL: 'https://hkk-database.firebaseio.com',
	projectId: 'hkk-database',
	storageBucket: 'hkk-database.appspot.com',
})
const express = require('express')

const server: expressTypes.Application = express()
const app = next({
	dev: (process.env.NODE_ENV || 'production') === 'development',
})

console.log('next be like ^')

const handel = app.getRequestHandler()

app.prepare()
	.then(() => {
		server.listen(PORT, () => {
			console.log(
				'initialize',
				`server listening on port ${PORT}`,
				'local:networking'
			)
		})
	})
	.catch((err) => console.log(err))
