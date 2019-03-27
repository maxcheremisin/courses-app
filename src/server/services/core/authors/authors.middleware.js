const express = require('express')
const router = express.Router()
const url = require('url')

module.exports = server => {
  router.get('/authors', (req, res) => {
    const requestUrl = url.parse(req.originalUrl, true)
    const query = requestUrl.query

    const authorsDb = server.db.getState().authors

    let authorsResponse = []

    const searchText = query.searchText

    if (!!searchText) {
      authorsResponse = authorsDb.filter(a => a.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
    }

    res.json(authorsResponse)
  })

  return router
}
