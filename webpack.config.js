const colours = require('./constants/colours');
const jsToScss = require('./utils/jsToScss'); // credit to adrienZ

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ca]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: jsToScss(colours),
                        }
                    }
                ],
            }
        ]
    }
}
