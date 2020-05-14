import React from 'react'

import Style from '../client/style/downloads.module.scss'

export default function () {
	return (
		<>
			<div className={`${Style.downloadSection}`}>
				<h1>Windows</h1>
				<p>
					Version:{' '}
					<select>
						<option value="2.0.0">2.0.0 (Latest)</option>
						<option value="1.1.0">1.1.0</option>
						<option value="1.0.1">1.0.1</option>
						<option value="1.0.0">1.0.0</option>
					</select>
				</p>
				<a>Download</a>
			</div>
		</>
	)
}
