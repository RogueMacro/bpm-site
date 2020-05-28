module.exports = {
	compress: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: 'svg-url-loader',
					options: {
						limit: 10000,
					},
				},
			],
		})

		return config
	},
	// exportPathMap: async function (
	// 	defaultPathMap,
	// 	{ dev, dir, outDir, distDir, buildId }
	// ) {
	// 	return {
	// 		'/': { page: '/' },
	// 		'/about': { page: '/about' },
	// 	}
	// },
}
