import React, { useEffect, useState } from 'react'

import { getSmartCache } from '../client/utils/fb'

import Style from '../client/style/package-index.module.scss'

export default function index() {
	const [packages, setPackages] = useState<any[]>([])

	useEffect(() => {
		import('firebase').then(({ firestore }) => {
			getSmartCache(
				firestore().collection('packages'),
				'packages;',
				1000*60*60
			).then((docs) =>
			docs.docs.forEach((value) =>
				setPackages([...packages, value.data()])
			)
		)
		})
	}, [])
	//const packages = ['Package1', 'Package2', 'Package3']
	/*doc.get({
		source: 'server',
	}).then((docResult) => {
		console.log(docResult)
		if (!docResult.exists)
			doc.set({
				name: user.displayName,
				packages: [],
			})
	})*/
	return (
		<>
			<div className={`${Style.search}`}>
				<h3>Package Index</h3>
				<form className="simple-box">
					<div className="input">
						<input type="text" className={`${Style.input}`} />
					</div>
				</form>
				<div>
					{packages.map((doc) => (
						<h4>
							<a>{JSON.stringify(doc)}</a>
						</h4>
					))}
				</div>
			</div>
		</>
	)
}
