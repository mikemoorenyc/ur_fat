
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./app.js",//path relative to this file
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  watch:true,
  resolve: { extensions: [".js", ".ts"] },
  module: {
		rules: [
			{
				test: /\.jsx?/i,
				loader: 'babel-loader',
				options: {
					presets: [
						'es2015'
					],
					plugins: [
						['transform-react-jsx', { pragma: 'h' }]
					]
				}
			}
		]
	},
  plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: '../../app.html',
            template: './index.html'
        })
   ]
}
