const mongoose = require('mongoose')

const Schema = mongoose.Schema
const async = require('async')
const config = require('./../../config')

/**
 *
 * @param page (required)
 * @param Model (required)
 * @param populate
 * @param queryParams
 * @param sortParams
 * @param callback (required)
 *
 * e.g pageQuery.query(2, Faq, function(result) {})
 */
const pageQuery = function (page, Model, queryParams, sortParams, populate, callback) {
  const pageSize = config.pageSize
  const start = (page - 1) * pageSize
  const $page = {
    pageNumber: page,
  }

  if (typeof queryParams === 'function') {
    callback = queryParams
    queryParams = {}
  }
  if (typeof sortParams === 'function') {
    callback = sortParams
    sortParams = {}
  }
  if (typeof populate === 'function') {
    callback = populate
    populate = ''
  }

  populate = populate || ''
  queryParams = queryParams || {}
  sortParams = sortParams || '-createdAt'

  async.parallel({
    count(done) { // 查询数量
      Model.count(queryParams).exec(function (err, count) {
        done(err, count)
      })
    },
    records(done) { // 查询一页的记录
      Model.find(queryParams).sort(sortParams).skip(start).limit(pageSize)
        .populate(populate)
        .exec(function (err, doc) {
          done(err, doc)
        })
    },
  }, function (err, results) {
    const count = results.count
    $page.pageCount = Math.ceil(count / pageSize)
    $page.results = results.records
    $page.amount = count
    callback(err, $page)
  })
}

module.exports = {
  query: pageQuery,
}
