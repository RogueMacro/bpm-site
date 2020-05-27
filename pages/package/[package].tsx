// SERVER
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'

// CLIENT
import React from 'react'
import { GetServerSideProps } from 'next'

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
				<p>All: {props?.downloads.total}</p>
				<p>Monthly: {props?.downloads.monthly}</p>
				<p>Weekly: {props?.downloads.weekly}</p>
				<p>Daily: {props?.downloads.daily}</p>
				<h3>Repository: REPO</h3>
			</div>
			<div className={`${Style.readme}`}>
				<h3>-- HERE GOES README --</h3>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const name = req.url?.match(/(?<=p|package)\/[^\/?#@:]*/s)
	if (name) {
		try {
			const apollo = new ApolloClient({
				uri: `localhost:${process.env.PORT || 8080}`,
			})

			const QUERY = gql`
				query($name: String!) {
					v1 {
						latest(name: $name) {
							versions
						}
					}
				}
			`

			const { data } = await apollo.query({
				query: QUERY,
				variables: {
					name,
				},
			})

			const props: StaticProps = data

			return {
				props,
			}
		} catch (error) {
			console.error(`500 in generation of ${req.url} thrown by package`)
			return { props: {} }
		}
	}
	return {
		props: {},
	}
}
