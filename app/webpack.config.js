
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./app.js",//path relative to this file
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: '../../app.html',
            template: './index.html'
        })
   ]
}
