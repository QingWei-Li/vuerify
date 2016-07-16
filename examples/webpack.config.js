var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

var examples = [
  'signup',
  'directive',
  'mint-ui'
]

var entry = {
  'vuerify': [path.join(__dirname, '../src/index.js')]
}
var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vuerify'
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/index.html'),
    chunks: []
  })
]

examples.forEach(function (key) {
  entry[key] = [path.join(__dirname, '/', key, '/entry.js')]
  plugins.push(new HtmlWebpackPlugin({
    filename: key + '/index.html',
    template: path.join(__dirname, '/', key, '/index.html'),
    chunks: [key, 'vuerify']
  }))
})

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }))
}

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:7].js' : '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/vuerify/' : '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    vue: 'Vue'
  },
  resolve: {
    alias: {
      'vuerify': path.join(__dirname, '../src.index.js')
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: [['component', { 'libraryName': 'mint-ui' }]]
  },
  plugins: plugins
}
