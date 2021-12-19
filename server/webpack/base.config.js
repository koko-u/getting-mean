/* eslint-disable */
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

const BUILD_ROOT = path.join(__dirname, '../dist')
const SRC_ROOT = path.join(__dirname, '../src')

module.exports = {
  context: SRC_ROOT,
  entry: path.resolve('src', 'index.ts'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: BUILD_ROOT,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './views', to: 'views' },
        { from: './public', to: 'public' }
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
}
