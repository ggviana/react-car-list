const webpack = require('webpack')
const path    = require('path')

const PATHS = {
  src:          path.join(__dirname, 'src'),
  dist:         path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules'),
}

module.exports = {
  devServer: {
    contentBase: PATHS.dist,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    devtool: 'eval-source-map',
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT,
  },
  entry: [
    PATHS.src
  ],
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'latest', 'stage-3']
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      PATHS.src,
      PATHS.node_modules,
    ]
  }
}