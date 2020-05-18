import React from 'react'
import { company, random } from 'faker'

import Style from '../style/package-index.module.scss'

export default function packageview(props: {
	name: string
	description: string
	downloads: string
	authors: string[]
	id: string
}) {
	return (
		<div className={Style.packageView}>
			<h2>
				<a href={`/m/${props.id}`}>{props.name}</a>
			</h2>
			<h4>{props.description}</h4>
			<p>Downloads: {props.downloads}</p>
			<p>Authors: {props.authors}</p>
		</div>
	)
}
