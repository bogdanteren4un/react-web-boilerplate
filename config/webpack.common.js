const path = require('path'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  CopyPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  dotenv = require('dotenv-webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: ['./src/app.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    aliasFields: ['browser'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@assets': path.resolve(__dirname, '../assets'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@redux': path.resolve(__dirname, '../src/redux'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@router': path.resolve(__dirname, '../src/router'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        oneOf: [
          {
            test: /\.m\.scss$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[local]__[hash:base64:5]',
                },
              },
              'sass-loader', // compiles Sass to CSS, using Node Sass by default
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              'css-loader', // translates CSS into CommonJS
              'sass-loader', // compiles Sass to CSS, using Node Sass by default
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              'css-loader', // translates CSS into CommonJS
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.ttf$/,
            use: [
              {
                loader: require.resolve('ttf-loader'),
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            oneOf: [
              {
                resourceQuery: /file/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
              {
                resourceQuery: /tag/,
                loader: 'react-svg-loader',
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new CopyPlugin([{ from: 'public', to: '.' }]),
    new webpack.HotModuleReplacementPlugin(),
    new dotenv({
      path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
    }),
  ],
}
