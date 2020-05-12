import React from 'react'

import { motion, useTransform, useViewportScroll } from 'framer-motion'

import Style from '../client/style/landing.module.scss'

function PathContainer({ style }: { style: React.CSSProperties }) {
	return (
		<g xmlns="http://www.w3.org/2000/svg" clip-path="url(#clip0)">
			<path
				d="M0 1024L527 497"
				stroke="black"
				stroke-width="60"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M286 1024L637 673"
				stroke="black"
				stroke-width="11"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M369 1024L720 673"
				stroke="black"
				stroke-width="11"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M194 1024L545 673"
				stroke="black"
				stroke-width="11"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
	)
}

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
