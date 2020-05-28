// SERVER
export { getServerSideProps } from '../../global/components/ssg/client'

// CLIENT
import React from 'react'

import { Project as StaticProps } from '../../global/typings/props'

import Style from '../../client/style/readID.module.scss'

export default function ReadID(props: StaticProps) {
	return (
		<>
			<div className={`${Style.packageInfo}`}>
				<h1>{props?.title}</h1>
				<p>By: {props?.author}</p>
				<h3>Downloads</h3>
				<hr />
				<p>All: {props?.downloads?.total}</p>
				<p>Monthly: {props?.downloads?.monthly}</p>
				<p>Weekly: {props?.downloads?.weekly}</p>
				<p>Daily: {props?.downloads?.daily}</p>
				<h3>Repository: REPO</h3>
				<p>{JSON.stringify(props)}</p>
			</div>
			<div className={`${Style.readme}`}>
				<h3>-- HERE GOES README --</h3>
			</div>
		</>
	)
}
