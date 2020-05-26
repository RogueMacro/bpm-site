import React from 'react'
import { GetStaticProps } from 'next'

import Style from '../../client/style/readID.module.scss'

interface StaticProps {
	title: string
	author: string
	downloads: {
		total: number
		monthly: number
		weekly: number
		daily: number
	}
	repo: string
	readMe: string
}

export default function ReadID(props: StaticProps) {
	return (
		<>
			<div className={`${Style.packageInfo}`}>
				<h1>{props.title}</h1>
				<p>By: {props.author}</p>
				<h3>Downloads</h3>
				<hr />
				<p>All: {props.downloads.total}</p>
				<p>Monthly: {props.downloads.monthly}</p>
				<p>Weekly: {props.downloads.weekly}</p>
				<p>Daily: {props.downloads.daily}</p>
				<h3>Repository: REPO</h3>
			</div>
			<div className={`${Style.readme}`}>
				<h3>-- HERE GOES README --</h3>
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const props: StaticProps = {
		title: 'TITLE',
		author: 'AUTHOR',
		downloads: {
			total: 0,
			daily: 0,
			monthly: 0,
			weekly: 0,
		},
		readMe: '',
		repo: '',
	}

	return {
		props: props,
	}
}
