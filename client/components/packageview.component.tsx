import React from 'react'
import { company, random } from 'faker'

import Style from '../style/package-index.module.scss'

export default function packageview(props: {
	name: string
	description: string
	downloads: string
	authors: string[]
}) {
	return (
		<div className={Style.packageView}>
			<h2>{props.name}</h2>
			<h4>{props.description}</h4>
			<p>Downloads: {props.downloads}</p>
			<p>Authors: {props.authors}</p>
		</div>
	)
}
