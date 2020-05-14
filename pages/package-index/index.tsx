import React, { useEffect, useState } from 'react'

import { getSmartCache } from '../../client/utils/fb'

import PackageView from '../../client/components/packageview.component'

import Style from '../../client/style/package-index.module.scss'

export default function index() {
	const [packages, setPackages] = useState<any[]>([])

	useEffect(() => {
		import('firebase').then(({ firestore }) => {
			getSmartCache(
				firestore().collection('packages'),
				'packages;',
				1000 * 60 * 60
			).then((docs) =>
				docs.docs.forEach((value) =>
					setPackages([...packages, value.data()])
				)
			)
		})
	}, [])

	return (
		<>
			<div className={`${Style.search}`}>
				<h2>Package Index</h2>
				<form className="simple-box">
					<div className="input">
						<input type="text" className={`${Style.input}`} />
					</div>
				</form>
				<div>
					{packages.map((doc) => (
						<PackageView
							name={doc.name}
							description={doc.description}
							downloads={doc.downloads}
							authors={doc.authors}
						/>
					))}
				</div>
			</div>
		</>
	)
}
