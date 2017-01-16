const path      = require('path')
const webpack   = require('webpack')
const express   = require('express')
const config    = require('./webpack.config')
const server    = express()
const compiler  = webpack(config)
const port      = 3000

server.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: config.devServer.stats
}))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening at http://localhost:${port}/`)
})
