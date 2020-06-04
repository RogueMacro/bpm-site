import { Project as StaticProps, SsrSsgProps } from '../../shared/typings/props'

// SERVER
export { getServerSideProps } from '../../shared/components/ssg/client'

// CLIENT
import React from 'react'
import Head from 'next/head'

import Markdown from 'react-markdown'

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
		author: 'NULL',
		readMe: 'NULL',
		repo: 'NULL',
		title: 'NULL',
		size: 0,
		version: '0.0.1a',
		...props,
	}
	const downloads: StaticProps['downloads'] = {
		...(process.env.NODE_ENV === 'development'
			? {
					daily: 24,
					weekly: 25,
					monthly: 50,
					total: 100,
			  }
			: {
					daily: 0,
					weekly: 0,
					monthly: 0,
					total: 0,
			  }),
		...props.downloads,
	}

	const downloadsPercent: Omit<StaticProps['downloads'], 'total'> = {
		monthly: (downloads?.monthly / downloads.total) * 100,
		weekly: (downloads.weekly / downloads.total) * 100,
		daily: (downloads.daily / downloads.total) * 100,
	}

	const border = (width: number) =>
		`solid clamp(0.05px, ${width * 2.5}px, 5px) var(--palet-5)`

	return (
		<>
			<Head>
				<title>{title} — Grill packages</title>
			</Head>
			<main className={Style.main}>
				<div className={`${Style.readme}`}>
					<Markdown escapeHtml={true}>{readMe}</Markdown>
				</div>
				<div className={`${Style.header}`}>
					<div className={Style.content}>
						<div className={Style.downloads}>
							<abbr title="no downloads" />
							{downloads.total >= 1 ? (
								<>
									<abbr
										title={`${downloads.total} total downloads`}
									/>
									{downloads.monthly !== downloads.total &&
									downloads.monthly > 0 ? (
										<abbr
											title={`${downloads.monthly} downloads this monthly`}
											style={{
												width: `${downloadsPercent.monthly}%`,
												borderRight: border(
													downloadsPercent.monthly -
														downloadsPercent.weekly
												),
											}}
										/>
									) : (
										<> </>
									)}
									{downloads.weekly !== downloads.monthly &&
									downloads.weekly > 0 ? (
										<abbr
											title={`${downloads.weekly} downloads this week`}
											style={{
												width: `${downloadsPercent.weekly}%`,
												borderRight: border(
													downloadsPercent.weekly -
														downloadsPercent.daily
												),
											}}
										/>
									) : (
										<></>
									)}
									{downloads.daily !== downloads.weekly &&
									downloads.daily > 0 ? (
										<abbr
											title={`${downloads.daily} downloads today`}
											style={{
												width: `${downloadsPercent.daily}%`,
												borderRight: border(
													downloadsPercent.daily
												),
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
