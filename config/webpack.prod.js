const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            inline: true
          }
        }
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor-app",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
})
