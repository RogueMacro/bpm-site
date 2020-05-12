import React from 'react'

// import { motion, useTransform, useViewportScroll } from 'framer-motion'

import Style from '../client/style/landing.module.scss'



export default function index() {
	return (
		<>
			<div className={`${Style.header} center`}>
				<h1>BPM</h1>
				{/*<sub className="header-sub">The Beef package manager</sub>-->*/}
				<sub className="header-sub">THE BEEF PACKAGE MANAGER</sub>

				<a href="#features" className={Style.navIcon}>
					arrow_back_ios
				</a>
			</div>
			<div className={`${Style.features} center`} id="features"></div>
		</>
	)
}
