import React, { useRef, useEffect, useState } from "react"

import { auth } from "firebase"

import Style from "../../client/style/login.module.scss"

export default function () {
	const loginRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		import("firebaseui").then(({ auth: UI }) => {
			function build() {
				if (loginRef.current) {
					new UI.AuthUI(auth()).start(loginRef.current, {
						signInOptions: [auth.GithubAuthProvider.PROVIDER_ID],
						callbacks: {
							// signInSuccessWithAuthResult: (
							// 	authResult: auth.UserCredential,
							// 	redirectUrl?: string | undefined
							// ) => {
							// 	setRedirectInProgress(true)

							// 	const redirect = () =>
							// 		(window.location.pathname = mainRedirectUrl)

							// 	const me = firestore()
							// 		.collection("users")
							// 		.doc(authResult.user?.uid)
							// 	me.get().then((doc) => {
							// 		if (!doc.exists && authResult.user?.email) {
							// 			const user: UserSchema = {
							// 				isAdmin: false,
							// 				email: authResult.user?.email,
							// 			}

							// 			me.set(user).then(redirect)
							// 		} else {
							// 			redirect()
							// 		}
							// 	}, redirect)

							// 	return false
							// },
							uiShown: () => {},
						},
						signInSuccessUrl: "/login/redirect",
					})
				}
			}
			if (process.env.NODE_ENV === "development")
				try {
					build()
				} catch (error) {}
			else build()
		})
	}, [loginRef])

	return (
		<div className={Style.loginUI}>
			<div ref={loginRef}></div>
		</div>
	)
}
