import { JSDOM } from 'jsdom'

import { merge } from '../utils/objectMethods'
import memoize from '../utils/memoize'

export interface NextData<PageProps = {}> {
	props: { pageProps: PageProps; __N_SSG?: boolean }
	page: '/reads'
	query: {}
	buildId: string
	nextExport: boolean
	isFallback: boolean
	gsp?: boolean
}

export default memoize(function <T = {}>(
	doc: string,
	data: Partial<NextData<T>>
) {
	const {
		window: { document },
	} = new JSDOM(doc)
	const jsonLocation = document.getElementById('__NEXT_DATA__')

	jsonLocation.textContent = JSON.stringify(
		merge(JSON.parse(jsonLocation.innerHTML) as NextData<T>, data)
	)
	return [...document.children].map((e) => e.outerHTML).join('')
})
