const jsonServer = require('json-server')
const express = require('express')
const path = require('path')

const init = require('./services')
const walk = require('./utils/walk')
const cors = require('./utils/cors')

const server = jsonServer.create()
const middleware = jsonServer.defaults()
const port = process.env.PORT || 4200

const isDev = process.env.NODE_ENV === 'development'
const build = path.join(__dirname, isDev ? '../../dist' : 'public')

walk('./services', function(err, results) {
  if (err) {
    console.log(err)
  } else {
    let ang = init(results)

    server.use('/', express.static(build))

    server.use(cors)
    server.use(jsonServer.bodyParser)
    server.use(middleware)

    server.use('/api', ang.routes)
    server.use('/api', ang.middleware)
    server.use('/api', ang.db)

    server.use('/*', function(req, res) {
      res.sendFile('index.html', {root: build})
    })

    server.listen(port, function() {
      console.log('Starting server at: ' + port)
    })
  }
})
