const mongoose = require('mongoose')

const Schema = mongoose.Schema
const async = require('async')
const config = require('./../../config')

/**
 *
 * @param model (required)
 * @param keyword (required)
 * @param fieldToSearch (required)
 *
 * return promise
 * e.g search(1, Faq, '机票', ['title', 'content']) note that: search ignore word case
 *
 */
const search = (page, model, keyword, fieldToSearch) => {
  const queryArr = []
  const pageSize = config.pageSize
  const start = (page - 1) * pageSize

  const promise = new Promise((resolve, reject) => {
    if (!fieldToSearch) { reject('fieldToSearch cannot be null') }

    fieldToSearch.forEach((key, index) => {
      const temp = {}
      temp[key] = new RegExp(`${keyword}`, 'i')
      queryArr.push(temp)
    })

    model.find({ $or: queryArr }).exec((err, items) => {
      if (err) reject(err)

      resolve({
        data: items && items.slice(start, start + pageSize),
        pageCount: Math.ceil(items.length / pageSize),
        amount: items.length,
      })
    })
  })

  return promise
}

module.exports = search
