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
    const pageSize = +query.pageSize || 5
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

    const from = fromPage * pageSize
    const to = pageSize * page + pageSize
    const totalCount = content.length
    const totalPages = Math.ceil(totalCount / pageSize)

    content = content.slice(from, to)

    res.json({
      content: content,
      totalCount: totalCount,
      pageSize: pageSize,
      page: page,
      fromPage: fromPage,
      totalPages: totalPages,
    })
  })

  return router
}
