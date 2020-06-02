import Context from '../typings/context.type'

// import axios from 'axios'

import * as staticProps from '../../global/typings/props'

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
                        // axios.get('')

						resolve({ title: data.name, ...data })
					} else resolve(null)
				}
			}, reject)
	)
export default getPackage
