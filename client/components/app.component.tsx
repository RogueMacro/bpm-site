import React, { FC, useEffect, useState } from 'react'
import { auth, firestore } from 'firebase'
import { initializeApp, analytics } from 'firebase/app'

import SessionStorage from '../typings/sessionStorage.type'

import useScreenMediaquery from '../hooks/useScreenMediaquery'
import { motion } from 'framer-motion'

import { range } from 'lodash'
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

type nav = FC<{
	isLoggedIn: boolean
	internalSessionStorage: StorageHandler<SessionStorage> | null
	logIn: (state: boolean) => void
}>

const Desktop: nav = function ({ isLoggedIn, internalSessionStorage, logIn }) {
	const CreateCollection: FC<{ title: string; href?: string }> = ({
		title,
		href,
		children,
	}) => (
		<div className="header-collection">
			{!href ? (
				<h2>{title}</h2>
			) : (
				<a href={href}>
					<h2>{title}</h2>
				</a>
			)}
			<div>{children}</div>
		</div>
	)

	return (
		<>
			<a href="/" className="center">
				<img
					height="75"
					src={svg /*"/assets/bpm_logo.svg"*/}
					alt="GRILL"
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
									'hasSeenGrillAnimation'
								)
									? 'end'
									: 'initial'
							}
							animate="end"
						>
							GRILL
						</motion.h1>
					) : (
						<></>
					)}
				</div>
			</a>
			<nav>
				<ul>
					<li>
						<CreateCollection
							href="/package-index"
							title="Package index"
						></CreateCollection>
					</li>
					<li>
						<CreateCollection
							href="/downloads"
							title="Downloads"
						></CreateCollection>
					</li>
					<li>
						<CreateCollection title="Reads" href="/reads">
							<a href="/reads/guide">Guide</a>
							<a href="/#faq">FAQ</a>
							<a href="/#about">About</a>
						</CreateCollection>
					</li>
					<li>
						{isLoggedIn ? (
							<CreateCollection
								title={`${
									auth().currentUser?.displayName ||
									(auth().currentUser?.email || '').split(
										'@'
									)[0] ||
									'user'
								}`}
							>
								<a href="/manage-packages">Manage packages</a>
								<a
									onClick={() => {
										auth()
											.signOut()
											.then(() => logIn(false))
									}}
								>
									Logout
								</a>
							</CreateCollection>
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
		</>
	)
}

// ! TODO: implement UX features from: https://www.youtube.com/watch?v=1D4FzPcEiN4&t=310s
const Mobile: nav = function ({ isLoggedIn, internalSessionStorage, logIn }) {
	const [expanded, setExpanded] = useState(false)

	return (
		<>
			<div
				className="hamburger-icon"
				onClick={() => setExpanded(!expanded)}
			>
				icon
			</div>

			<motion.div
				variants={{
					initial: {
						clipPath: 'circle(0% at calc(100% - 60px) 60px)',
						transition: {
							delay: 1,
							type: 'spring',
							stiffness: 60,
							restDelta: 0.1,
							delayChildren: 0,
							staggerChildren: 0.1,
							staggerDirection: -1,
						},
					},
					end: {
						clipPath: 'circle(131.415%  at calc(100% - 60px) 60px)',
						transition: {
							delay: 0,
							type: 'spring',
							stiffness: 400,
							damping: 40,

							delayChildren: 0.5,
							staggerChildren: 0.1,
						},
					},
				}}
				initial="initial"
				animate={expanded ? 'end' : 'initial'}
				className="menu"
			>
				<motion.div
					variants={{
						initial: { y: 40, opacity: 0 },
						end: { y: 0, opacity: 1 },
					}}
				>
					<a href={'/'}>home</a>
				</motion.div>
			</motion.div>
		</>
	)
}

const app: FC = function ({ children }) {
	const isMobile = useScreenMediaquery(1200, 0, 'and')

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

					// * TODO: error handling
				}, console.error)
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
			internalSessionStorage.setItem('hasSeenGrillAnimation', true)
		}
	}, [internalSessionStorage])

	return (
		<div className="app">
			<header>
				{isMobile ? (
					<Desktop
						{...{ internalSessionStorage, isLoggedIn, logIn }}
					/>
				) : (
					<Mobile
						{...{ internalSessionStorage, isLoggedIn, logIn }}
					/>
				)}
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
