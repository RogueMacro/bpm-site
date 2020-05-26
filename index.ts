import * as expressTypes from 'express'
import { Project as ProjectArgs } from './global/typings/StaticProps'

import { initializeApp as initializeFirebaseApp } from './node_modules/firebase-admin/lib'

import { join } from 'path'
import { parse } from 'url'

import editNextDoc from './server/components/editNext.component'
import gql from './api/server'
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

gql.applyMiddleware({ app })

app.get(/\/assets\//, (req, res) => {
	res.sendFile(join(__dirname, parse(req.url).pathname))
	setTimeout(() => res.end(), 100)
})

app.get(/favicon.ico/, (_, res) => res.redirect(303, '/assets/bpm_logo.svg'))

app.get(/_next/, (req, res) =>
	resolver(parse(req.url).pathname).then((fName) => {
		res.sendFile(fName)
		setTimeout(() => res.end(), 100)
	})
)

app.get(/.*?\/(package|p)\/.*/, (req, res) => {
	generate({
		url: '/package/package',
		userAgent: req.headers['user-agent'],
	}).then(([doc]) => {
		const resultingDoc = editNextDoc<ProjectArgs>(doc, {
			props: {
				pageProps: {
					author: 'author',
					downloads: { daily: 10, monthly: 10, total: 10, weekly: 10 },
					readMe: 'test',
					repo: 'test',
					title: 'test',
				},
				__N_SSG: true,
			},
		})

		res.send(resultingDoc)
	})
})

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
