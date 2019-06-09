const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const basePath = __dirname

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    index: './index.ts'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(basePath, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{test: /.tsx?$/, loader: 'ts-loader'}]
  },
  plugins: [new CopyPlugin([{from: 'template/', to: 'template/'}])]
}
