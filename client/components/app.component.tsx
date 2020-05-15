import React, { FC, useEffect, useState } from 'react'
import { initializeApp, analytics, auth, firestore } from 'firebase'

import SessionStorage from '../typings/sessionStorage.type'

import { motion } from 'framer-motion'

import StorageHandler from '../utils/storageHandler'

import svg from '../../assets/bpm_logo.svg'

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
	function logIn(state: boolean) {
		setIsLoggedIn(state)
	}

	const [
		internalSessionStorage,
		setInternalSessionStorage,
	] = useState<StorageHandler<SessionStorage> | null>(null)

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

			auth().onAuthStateChanged((user) => logIn(!!user?.uid))

			auth()
				.getRedirectResult()
				.then(({ user }) => {
					logIn(true)

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

		setInternalSessionStorage(
			new StorageHandler<SessionStorage>(sessionStorage)
		)
	}, [])

	useEffect(() => {
		if (internalSessionStorage) {
			internalSessionStorage.setItem('hasSeenBPMAnimation', true)
		}
	}, [internalSessionStorage])

	return (
		<div className="app">
			<header>
				<a href="/" className="center">
					<img
						height="75"
						src={svg /*"/assets/bpm_logo.svg"*/}
						alt="bpm"
					/>
					<div className="center">
						{internalSessionStorage ? (
							<motion.h1
								variants={{
									initial: {
										x: -150,
										opacity: 1,
									},
									end: {
										x: 0,
										opacity: 1,
									},
								}}
								transition={{
									ease: 'easeInOut',
									duration: 0.5,
									delay: 1,
								}}
								initial={
									internalSessionStorage.getItem(
										'hasSeenBPMAnimation'
									)
										? 'end'
										: 'initial'
								}
								animate="end"
							>
								BPM
							</motion.h1>
						) : (
							<></>
						)}
					</div>
				</a>
				<nav>
					<ul>
						<li>
							<a href="/package-index">Package index</a>
						</li>
						<li>
							<a href="/downloads">Downloads</a>
						</li>
						<li>
							<a href="/guide">Guide</a>
						</li>
						<li>
							<a href="/#faq">FAQ</a>
						</li>
						<li>
							<a href="/#about">About</a>
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
											.then(() => logIn(false))
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
				<FooterItem
					title={isLoggedIn ? 'Recommended' : 'Popular'}
					content={[<div>Package1</div>, <div>Package2</div>]}
				/>
			</footer>
		</div>
	)
}

export default app
