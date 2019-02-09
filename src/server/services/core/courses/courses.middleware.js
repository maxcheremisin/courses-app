const express = require('express')
const router = express.Router()
const url = require('url')
const sort = require('../../../utils/sort')

module.exports = server => {
  router.get('/courses', (req, res) => {
    const requestUrl = url.parse(req.originalUrl, true)
    const query = requestUrl.query

    const courses = server.db.getState().courses
    const page = +query.page || 0
    const fromPage = +(query.fromPage || page)
    const itemsPerPage = +query.itemsPerPage || 5
    const sortBy = query.sortBy || 'date'

    let content = sort(courses, sortBy)

    if (!!query.searchText) {
      content = courses.filter(
        course =>
          (course.caption || '')
            .concat(course.description || '')
            .toUpperCase()
            .indexOf(query.searchText.toUpperCase()) >= 0,
      )
    }

    const from = fromPage * itemsPerPage
    const to = itemsPerPage * page + itemsPerPage
    const totalCount = content.length
    const totalPages = Math.ceil(totalCount / itemsPerPage)

    content = content.slice(from, to)

    res.json({
      content: content,
      totalCount: totalCount,
      itemsPerPage: itemsPerPage,
      page: page,
      fromPage: fromPage,
      totalPages: totalPages,
    })
  })

  return router
}
