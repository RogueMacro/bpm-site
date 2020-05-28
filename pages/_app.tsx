import { AppProps } from 'next/app'
import Head from 'next/head'

import App from '../client/components/app.component'
import Reads from '../client/components/reads.component'

import '../client/style/index.scss'

export default function Root({ Component, pageProps, router }: AppProps) {
	let comp = <Component {...pageProps} />

	if(router.route.startsWith('/reads/'))comp = <Reads>{comp}</Reads>

	return (
		<>
			<Head>
				<title>GRILL</title>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
			</Head>
			<App>
				{comp} {/* app goes here */}
			</App>
		</>
	)
}
