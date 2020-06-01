import { Project as StaticProps } from '../../global/typings/props'

// SERVER
export { getServerSideProps } from '../../global/components/ssg/client'

// CLIENT
import React from 'react'
import Head from 'next/head'

import formatSize from '../../client/utils/formatSize'

import Style from '../../client/style/package.module.scss'

export default function ReadID(props: Partial<StaticProps>) {
	const {
		author,
		downloads,
		readMe,
		repo,
		title,
		size,
	}: Partial<StaticProps> = {
		downloads: { daily: 0, weekly: 1, monthly: 1, total: 1 },
		author: 'Me',
		readMe: `
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
			Impedit, quod alias nulla assumenda nemo reprehenderit
			similique necessitatibus id, doloribus commodi, sapiente
			aspernatur. Voluptatem nostrum repellendus accusamus
			asperiores enim quae optio.
		`,
		repo: 'https://github.com/RogueMacro/grill-site',
		title: 'DEFAULT',
		size: 1200,
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
									{downloads.monthly < downloads.total &&
									downloads.monthly < 0 ? (
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
									{downloads.weekly < downloads.monthly &&
									downloads.weekly < 0 ? (
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
									{downloads.daily < downloads.weekly &&
									downloads.daily < 0 ? (
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
									{repo
										.replace(
											/(https?:\/\/)?(github\.com\/)/,
											''
										)
										.replace('/', '  /  ')}
								</a>
							</div>
							<div className={`${Style.size} ${Style.element}`}>
								{formatSize(size)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
