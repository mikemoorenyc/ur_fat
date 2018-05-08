
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: "./app.js",//path relative to this file
  output: {
    path: __dirname + "/../dist",
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
			},
      {
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })

			}

		]
	},
  plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            hash: true,
            filename: '../index.html',
            template: './index-template.html'
        }),


   ]
}
