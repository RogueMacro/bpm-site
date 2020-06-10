import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import Style from '../../client/style/package-index.module.scss'

function PackageView(props: {
	name: string
	description: string
	downloads: string
	authors: string[]
	id: string
}) {
	return (
		<div className={Style.packageView}>
			<h2>
				<a href={`/package/${props.id}`}>{props.name}</a>
			</h2>
			<h4>{props.description}</h4>
			<p>Downloads: {props.downloads}</p>
			<p>Authors: {props.authors}</p>
		</div>
	)
}

export default function index() {
	const [packages, setPackages] = useState<any[]>([])

	useEffect(() => {
		import('firebase').then(({ firestore }) => {
			import('../../client/utils/fb').then(({ getSmartCache }) => {
				getSmartCache(
					firestore().collection('packages').limit(10),
					'packages;',
					1000 * 60 * 60
				).then((docs) =>
					docs.docs.forEach((value) =>
						setPackages([
							...packages,
							{ ...value.data(), id: value.id },
						])
					)
				)
			})
		})
	}, [])

	return (
		<>
			<Head>
				<title>Package-index — Grill</title>
			</Head>
			<div className={`${Style.search}`}>
				<h2>Package Index</h2>
				<form className="simple-box">
					<div className="input">
						<input type="text" className={`${Style.input} input`} />
					</div>
				</form>
				<div>
					{packages.map((doc) => (
						<PackageView
							name={doc.name}
							description={doc.description}
							downloads={doc.downloads}
							authors={doc.authors}
							id={doc.id}
						/>
					))}
				</div>
			</div>
		</>
	)
}
