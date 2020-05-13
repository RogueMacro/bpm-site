import * as expressTypes from 'express'

import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'

import { join } from 'path'
import { parse } from 'url'

import _generate from './server/components/generate.component'
import getFilePathFromChain from './server/utils/getFilePathFromChain'

const PORT = process.env.PORT || 8080

initializeFirebaseApp({
	databaseURL: 'https://bpm-db.firebaseio.com',
	projectId: 'bpm-db',
	storageBucket: 'bpm-db.appspot.com',
})

const root = join(__dirname, 'out')

const resolver = (path: string): Promise<string> =>
	new Promise((resolve, reject) => {
		path = join(root, path)

		// console.log(path)

		getFilePathFromChain(
			[
				path,
				path + '.html',
				path + '.htm',
				path + 'index.html',
				join(path, '/index.html'),
				join(path, '/index.htm'),
				root + '/404.html',
			],
			'file'
		).then((v) => {
			resolve(v)
		}, reject)
	})

const generate = _generate(resolver)

const express = require('express')

const app: expressTypes.Application = express()

app.set('trust proxy', true)

app.get(/_next/, (req, res) =>
	resolver(parse(req.url).pathname).then((fName) => {
		res.sendFile(fName)
		setTimeout(() => res.end(), 100)
	})
)

app.get(/.*/, (req, res) => {
	generate({ url: req.url, userAgent: req.headers['user-agent'] }).then(
		([value]) => {
			if (value) {
				res.send(value)
			}
		},
		console.error
	)
})

app.listen(PORT, () => {
	console.log(
		'initialize',
		`server listening on port ${PORT}`,
		'local:networking'
	)
})
