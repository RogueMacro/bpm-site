import React, { FC } from 'react'
import Head from 'next/head'

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
		<>
			<Head><title>Home — Grill</title></Head>
			<div>
				<h1>Your packages</h1>
				<div className={`${Style.cardContainer}`}>
					<button>
						<a>
							<h1><a>+</a></h1>
						</a>
					</button>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9]
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
		</>
	)
}
