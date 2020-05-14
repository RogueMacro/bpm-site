import React, { FC, useEffect, useState } from 'react'
import { initializeApp, analytics, auth, firestore } from 'firebase'

import svg from '../../assets/bpm_logo.svg'

import { getSmartCache } from '../utils/fb'
import { userInfo } from 'os'

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

	const [awaitingUserDocWriteCheck, setAwaitingUserDocWriteCheck] = useState(
		false
	)

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

			auth()
				.getRedirectResult()
				.then(({ user }) => {
					setIsLoggedIn(true)

					if (user) {
						const doc = firestore()
							.collection('users')
							.doc(user?.uid)
						doc.get({
							source: 'server',
						}).then((docResult) => {
							console.log(docResult)
							if (!docResult.exists)
								doc.set({
									name: user.displayName,
									packages: [],
								})
						})
					}

					// TODO: error handling
				})
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
				<a href="/" className="center">
					<img
						height="75"
						src={svg /*"/assets/bpm_logo.svg"*/}
						alt="bpm"
					/>
				</a>
				<nav>
					<ul>
						<li>
							<a href="/package-index">Package index</a>
						</li>
						{isLoggedIn ? (
							<li>
								<a href="/manage-packages">Manage packages</a>
							</li>
						) : (
							<></>
						)}
						<li>
							{isLoggedIn ? (
								<a
									onClick={() => {
										auth()
											.signOut()
											.then(() => setIsLoggedIn(false))
									}}
								>
									Logout
								</a>
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
												() => null,
												(err) => console.log(err)
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
