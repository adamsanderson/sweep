/* eslint-disable */

const path = require('path')
const webpack = require('webpack')
const process = require('process')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: pickMode(process.env["NODE_ENV"]),
  entry: {
    // Each entry declares an entrypoint to be built.
    background: './src/background.js',
    popup: './src/Popup/index.js',
  },
  output: {
    // Write each source entry into the extension dist folder named
    // after its entry config key.
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    // Transpiles all code (except for third party modules)
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      // Babel options are in .babelrc
      use: {
        loader: "babel-loader"
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, "src"),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      // use 'development' unless process.env.NODE_ENV is defined
      NODE_ENV: 'development',
    }),
    new CopyPlugin([
      {from: './static'}
    ])
  ],
  optimization: {
    splitChunks: {
      name: "shared",
      chunks: "all"
    }
  },
  // Expose source maps
  devtool: 'sourcemap',
}

// Enforces building in either development or production mode.
function pickMode(nodeEnv) {
  if (!nodeEnv) return "development"
  if (nodeEnv === "production") return "production"
  if (nodeEnv === "development") return "development"
  throw `Unknown NODE_ENV: ${nodeEnv}`;
}