import React, { useEffect, useState } from 'react'
import { firestore } from 'firebase'

import Style from '../client/style/package-index.module.scss'

export default function index() {
	const [packages, setPackages] = useState([])

	useEffect(()=>{
		firestore().collection('packages')
	},[])
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
					{packages.then((docs) => {
						docs.forEach((doc) => (
							<h4>
								<a>{doc.data()}</a>
							</h4>
						))
					})}
				</div>
			</div>
		</>
	)
}
