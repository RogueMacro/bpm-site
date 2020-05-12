import React from 'react'

import Style from '../client/style/package-index.module.scss'

export default function index() {
	return (
		<>
			<div className={`${Style.search}`}>
				<h3>Package Index</h3>
				<form className="simple-box">
					<div className='input'>
						<input type="text" className={`${Style.input}`} />
					</div>
				</form>
			</div>
		</>
	)
}
