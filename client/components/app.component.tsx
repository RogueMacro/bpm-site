import React, { FC, useEffect, useState } from 'react'
import { initializeApp, analytics, auth } from 'firebase'

import { getSmartCache } from './fb'

const FooterItem: FC<{
	className?: string
	title: string
	content: React.ReactNode[]
}> = ({ className, content, title }) => (
	<div className={className}>
		<h3>{title}</h3>
		{content.map((content, index) => (
			<div key={index}>{content}</div>
		))}
	</div>
)

const app: FC = function ({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		function createApp() {
			initializeApp({
				apiKey: 'AIzaSyCdBOPV4J42w0vVbBAu6Uvzi1xfUTtC1kY',
				authDomain: 'bpm-db.firebaseapp.com',
				databaseURL: 'https://bpm-db.firebaseio.com',
				projectId: 'bpm-db',
				storageBucket: 'bpm-db.appspot.com',
				messagingSenderId: '22685450603',
				appId: '1:22685450603:web:416a9336550a0dbdc9cc2e',
				measurementId: 'G-F7LEHTMP9Y',
			})
			analytics()

			auth().onAuthStateChanged((user) => setIsLoggedIn(!!user?.uid))
		}
		if (process.env.NODE_ENV === 'development')
			try {
				createApp()
			} catch (error) {}
		else createApp()
	}, [])

	return (
		<div className="app">
			<header>
				<h2>
					<a href="/">bpm</a>
				</h2>
				<nav>
					<ul>
						<li>
							<a href="/add-package">Add</a>
						</li>
						<li>
							{isLoggedIn ? (
								<a onClick={() => {}}>Logout</a>
							) : (
								<a
									onClick={() => {
										const provider = new auth.GithubAuthProvider()

										provider.addScope('repo')

										provider.setCustomParameters({
											allow_signup: 'true',
										})

										auth()
											.signInWithRedirect(provider)
											.then(
												(result) => {
													setIsLoggedIn(true)
												},
												(err) => {
													console.error(err)
													// TODO: error handling
												}
											)
									}}
								>
									Login with GitHub
								</a>
							)}
						</li>
					</ul>
				</nav>
			</header>
			<main> {children} </main>
			<footer>
				<FooterItem title="popular packages" content={[]} />
			</footer>
		</div>
	)
}

export default app
