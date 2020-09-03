import './dbBaseScript'

import Package from '../db/models/package'

import { name, company } from 'faker'

Package.find({})
	.exec()
	.then((v) => {
		console.log(v)
		process.exit(0)
	})
