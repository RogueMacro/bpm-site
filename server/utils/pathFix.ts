export default (path: string) =>
	process.platform === 'win32'
		? path.replace(/\//g, '\\')
		: path.replace(/\\/g, '/')
