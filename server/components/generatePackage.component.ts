import Context from '../typings/context.type'
import * as staticProps from '../../shared/typings/props.type'

import { cacheForAsync } from '../utils/cache'
import { parse } from 'url'
import axios from 'axios'

const getReadme = cacheForAsync(
	(repo: string) =>
		new Promise((resolve, reject) => {
			axios
				.get(
					`https://raw.githubusercontent.com/${repo}/master/README.md`
				)
				.then((res) => {
					console.log(res.data)
					resolve(res.data)
				}, reject)
		}),
	1000 * 60 * 60 * 12
)

const getPackage = ({ packages }: Context) => (packageID: string) =>
	new Promise((resolve, reject) =>
		packages
			.doc(packageID)
			.get()
			.then((v) => {
				if (!v.exists) resolve(null)
				else {
					const data = (v.data() || {}) as Partial<
						staticProps.Project
					>
					if (data && data.author && data.name && data.repo) {
						const repo = parse(data.repo).pathname

						console.log(repo)
						if (repo) {
							getReadme(repo).then((str) =>
								resolve({
									title: data.name,
									readMe: str,
									...data,
								})
							)
						} else resolve({ title: data.name, ...data })
					} else resolve(null)
				}
			}, reject)
	)
export default getPackage
