const express = require('express')
const path = require('path')
const app = express()
const build = path.join(__dirname, 'dist/angular-mentoring')
const port = process.env.PORT || 8080

app.listen(port, function() {
  console.log('Starting server at localhost: ' + port)
})

app.use('/', express.static(build))

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(build)})
})
