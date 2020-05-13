import React from 'react'

import Style from '../client/style/manage-packages.module.scss'

export default function managepackages() {
	return (
		<div>
			<h1>Your packages</h1>
			<div className={`${Style.cardcontainer}`}>
				<div className={`${Style.card}`}>
					<h2>Awesome Package</h2>
					<p>Downloads: 6254</p>
					<a>Manage</a>
				</div>
				<div className={`${Style.card}`}>
					<h2>Cool Package</h2>
					<p>Downloads: 1643</p>
					<a>Manage</a>
				</div>
				<div className={`${Style.card}`}>
					<h2>Nah Package</h2>
					<p>Downloads: 632</p>
					<a>Manage</a>
				</div>
				<div className={`${Style.card}`}>
					<h2>Epic Package</h2>
					<p>Downloads: 56437</p>
					<a>Manage</a>
				</div>
			</div>
		</div>
	)
}
