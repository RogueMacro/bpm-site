import React, { FC } from 'react'

import { company, random } from 'faker'
import { range } from 'lodash'

import Style from '../client/style/manage-packages.module.scss'

const Card: FC<{ title: string; downloads: number; id: string }> = ({
	title,
	downloads,
	id,
}) => (
	<div>
		<h2>{title}</h2>
		<p>Downloads: {downloads}</p>
		<a href={`m/${id}`}>Manage</a>
	</div>
)

export default function managePackages() {
	return (
		<div>
			<h1>Your packages</h1>
			<div className={`${Style.cardContainer}`}>
				{range(0,100)
					.map((seed) => {
						return {
							title: company.bs(),
							id: random.uuid(),
							downloads: Math.floor(Math.random() * 100000),
						}
					})
					.map((props) => (
						<Card {...props} key={props.id} />
					))}
			</div>
		</div>
	)
}
