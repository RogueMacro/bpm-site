import './dbBaseScript'

import Package from '../db/models/package'
import Version from '../db/models/version'

import { name, company } from 'faker'
;(async () => {
	const pkg = await Package.create({
		name: company.bs(),
		url: 'http://google.com',
	})

	console.log(pkg)

	await Version.create({
		parentName: pkg.name,
		versionRepoURL: 'no',
		parentID: pkg._id,
		repoType: 'git',
		version: '1.shit.0',
	})
	process.exit(1)
})()
