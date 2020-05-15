import { AppProps } from 'next/app'
import Head from 'next/head'

import App from '../client/components/app.component'

import '../client/style/index.scss'

export default function Root({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>bpm - Package Index</title>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
			</Head>
			<App>
				<Component {...pageProps} /> {/* app goes here */}
			</App>
		</>
	)
}
