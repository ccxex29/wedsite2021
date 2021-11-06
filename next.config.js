const nextBuildId = require('next-build-id');
module.exports = {
	// target: "serverless",
	generateBuildId: () => nextBuildId({dir: __dirname}),
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
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
	"presets": [
		[
			"next/babel",
			{
				"preset-env": {
					useBuiltIns: false,
					"targets": "Chrome >= 60, Safari >= 10.1, iOS >= 10.3, Firefox >= 54, Edge >= 15",
				}
			}
		]
	],
	webpack: (config, {dev, isServer}) => {
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				'react': 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
				'react/jsx-runtime': 'preact/jsx-runtime',
			});
		}
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
}
