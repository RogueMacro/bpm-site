import React from 'react'

import Style from '../../client/style/readID.module.scss'

export default function ReadID() {
	return (
		<>
			<div className={`${Style.packageInfo}`}>
				<h1>TITLE</h1>
				<p>By: AUTHOR</p>
				<h3>Downloads</h3>
				<hr />
				<p>All: 55432</p>
				<p>Monthly: 5423</p>
				<p>Weekly: 831</p>
				<p>Daily: 43</p>
				<h3>Repository: REPO</h3>
			</div>
			<div className={`${Style.readme}`}>
				<h3>-- HERE GOES README --</h3>
			</div>
		</>
	)
}
