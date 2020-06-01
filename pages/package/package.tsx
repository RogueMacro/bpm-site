import { Project as StaticProps, SsrSsgProps } from '../../global/typings/props'

// SERVER
export { getServerSideProps } from '../../global/components/ssg/client'

// CLIENT
import React from 'react'
import Head from 'next/head'

import formatSize from '../../client/utils/formatSize'

import Style from '../../client/style/package.module.scss'

export default function ReadID(props: SsrSsgProps<StaticProps>) {
	const {
		author,
		readMe,
		repo,
		title,
		size,
		version,
	}: Partial<StaticProps> = {
		...props,
		author: 'NULL',
		readMe: 'NULL',
		repo: 'NULL',
		title: 'NULL',
		size: 0,
		version: '0.0.1a',
	}
	const downloads: StaticProps['downloads'] = {
		...props.downloads,
		daily: 0,
		weekly: 0,
		monthly: 0,
		total: 0,
	}

	return (
		<>
			<Head>
				<title>{title} — Grill packages</title>
			</Head>
			<main className={Style.main}>
				<div className={`${Style.readme}`}>{readMe}</div>
				<div className={`${Style.header}`}>
					<div className={Style.content}>
						<div className={Style.downloads}>
							<span />
							{downloads.total >= 1 ? (
								<>
									<span />
									{downloads.monthly !== downloads.total &&
									downloads.monthly > 0 ? (
										<span
											style={{
												width: `${
													(downloads?.monthly /
														downloads.total) *
													100
												}%`,
											}}
										/>
									) : (
										<> </>
									)}
									{downloads.weekly !== downloads.monthly &&
									downloads.weekly > 0 ? (
										<span
											style={{
												width: `${
													(downloads.weekly /
														downloads.total) *
													100
												}%`,
											}}
										/>
									) : (
										<></>
									)}
									{downloads.daily !== downloads.weekly &&
									downloads.daily > 0 ? (
										<span
											style={{
												width: `${
													(downloads.daily /
														downloads.total) *
													100
												}%`,
											}}
										/>
									) : (
										<></>
									)}
								</>
							) : (
								<></>
							)}
						</div>
						<div className={Style.info}>
							<h1>{title}</h1>
							<p>By: {author}</p>
							<div className={`${Style.repo} ${Style.element}`}>
								<a href={repo}>
									{(repo || '')
										.replace(
											/(https?:\/\/)?(github\.com\/)/,
											''
										)
										.replace('/', '  /  ')}
								</a>
							</div>
							<div className={`${Style.size} ${Style.element}`}>
								{formatSize(size || 0)}
							</div>
							<div
								className={`${Style.version} ${Style.element}`}
							>
								{version}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
