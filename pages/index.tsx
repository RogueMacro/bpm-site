import React from 'react'

import Style from '../client/style/landing.module.scss'

export default function index() {
	return (
		<>
			<div className={`${Style.header} center`}>
				<h1>BPM</h1>
				<sub className="header-sub">The beef package manager</sub>

				<span className={Style.navIcon}>arrow_back_ios</span>
			</div>
		</>
	)
}
