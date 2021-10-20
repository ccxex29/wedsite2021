module.exports = {
	// target: "serverless",
	reactStrictMode: true,
	images: {
		loader: 'imgix',
		path: 'https://imgix.femmund.com',
	},
	plugins: [
		"postcss-flexbugs-fixes",
		[
			"postcss-preset-env",
			{
				"autoprefixer": {
					"flexbox": "no-2009"
				},
				"stage": 3,
				"features": {
					"custom-properties": false
				}
			}
		],
		[
			"@fullhuman/postcss-purgecss",
			{
				content: [
					"./pages/**/*.{js,jsx,ts,tsx}",
					"./components/**/*.{js,jsx,ts,tsx}"
				],
				defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
				safelist: ["html", "body"]
			},
		],
	],
	webpack: (config, {isDev, isServer}) => {
		if (!isDev && !isServer) {
			Object.assign(config.resolve.alias, {
				'react': 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
				'react/jsx-runtime': 'preact/jsx-runtime',
			});
		}

		return config;
	},
}
