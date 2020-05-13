import { exists, lstat } from 'fs'

export default function getFilePathFromChain(
	[path, ...tail]: string[],
	mode: 'dir' | 'file' | 'any'
): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (!path) resolve(null)
		else
			exists(path, (doesExist) => {
				if (doesExist && mode === 'any') resolve(path)
				else if (doesExist)
					lstat(path, (err, stat) => {
						if (err) reject(err)

						if (mode === 'dir')
							if (stat.isDirectory()) resolve(path)
							else resolve(path)
					})
				else getFilePathFromChain(tail, mode).then(resolve, reject)
			})
	})
}
