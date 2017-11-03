const keystone = require('keystone')
const _ = require('lodash')
const config = require('./../../config')
const pageQuery = require('./page-query')
const search = require('./search')
const audit = require('./audit')

class BaseController {
  /**
   *
   * @param {Object} model
   * @param {Object} options
   * @param {String} options.section - controller 的 section 名跟 controller以及jade文件名保持一致
   * @param {Array} options.searchProps - list 时需要搜索的字段，数组元素必须为 String
   * @param {String} options.populateField - 需要关联查询的集合
   * @param {String} options.listPopulateField - 查询列表时需要关联查询的集合
   * @param {String} options.previewUrl - 需要预览的地址
   * @param {String} options.mixProp - Mixed 类型的字段，在更新时调用 markModifed 方法
   * @param {Function} options.addAdapterFn - 创建一个文档(doc)时，需要做的数据结构兼容处理
   * @param {Function} options.formatListItemFn - 对 list 方法返回的数据做格式化处理，比如一些时间的字段需要转成字符串
   * @param {Function} options.formatItemFn - 作用同上，不过时针对 get 方法
   */
  constructor(model, options) {
    this.model = model

    this.section = options.section // 模块 section 名，跟 controller 文件名保持一致
    this.displayColumns = options.displayColumns // list 模块需要显示的列
    this.dateProps = options.dateProps
    this.searchProps = options.searchProps // 搜索时需要搜索的字段，数组：类型必须为 String
    this.populateField = options.populateField
    this.listPopulateField = options.listPopulateField
    this.previewUrl = options.previewUrl
    this.sortParams = options.sortParams
    this.mixProp = options.mixProp

    this.addAdapterFn = options.addAdapterFn // create 模块保存 model 时数据处理
    this.setListLocal = this.getListItemFn(options.formatListItemFn)
    this.setGetLocal = this.getItemDetailFn(options.formatItemFn)

    this.list = this.list.bind(this)
    this.search = this.search.bind(this)
    this.get = this.get.bind(this)
    this.audit = this.audit.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  static getListItemFn(formatListItemFn) {
    return (locals, $page) => {
      if (_.isFunction(formatListItemFn)) {
        const formatResult = formatListItemFn($page.results)
        _.extend(locals, formatResult.locals)

        if (formatResult.results) $page.results = formatResult.results
      }


      locals.data.items = $page.results
      locals.pageCount = $page.pageCount
      locals.amount = $page.amount
    }
  }

  static getItemDetailFn(formatItemFn) {
    return (locals, data) => {
      if (_.isFunction(formatItemFn)) {
        const formatResult = formatItemFn(data)
        _.extend(locals, formatResult.locals)
        if (formatResult.results) data = formatResult.results
      }
      locals.item = data
    }
  }

  /**
   *
   * @param {*} req 请求体
   * @param {*} res 响应
   */
  static list(req, res, next) {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = this.section
    locals.url = req.params.page ? req.url.replace(`/${req.params.page}`, '') : req.url
    locals.currentPage = req.params.page || 1

    locals.data = {
      items: [],
    }

    locals.columns = this.displayColumns
    const sortParams = this.sortParams || '-updatedAt' // 默认按更新时间排序
    const populate = this.listPopulateField
    view.on('init', (next) => {
      pageQuery.query(locals.currentPage, this.model, {}, sortParams, populate, (err, $page) => {
        this.setListLocal(locals, $page)
        next(err)
      })
    })

    view.render('list')
  }

  /**
   *
   * @param {*} req 请求体
   * @param {*} res 响应
   */
  static search(req, res) {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = this.section
    locals.url = req.params.page ? req.url.replace(`/${req.params.page}`, '') : req.url
    locals.currentPage = req.params.page || 1
    locals.searchKeyword = req.params.keyword

    locals.data = {
      items: [],
    }

    locals.columns = this.displayColumns

    view.on('init', (next) => {
      search(locals.currentPage, this.model, req.params.keyword, this.searchProps)
        .then(($page) => {
          this.setListLocal(locals, $page)
          next()
        })
        .catch((err) => {
          console.log(err)
          next(err)
        })
    })

    view.render('list')
  }

  audit(req, res) {
    audit(req, res, this.model, this.section)
  }

  remove(req, res) {
    this.model.findByIdAndRemove(req.params.id, (err, item) => {
      if (err) {
        console.log(err)
        return
      }

      res.redirect(`/manage/${this.section}/list`)
    })
  }

  get(req, res, next) {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.previewUrl = `${this.previewUrl}`

    locals.item = {}

    view.on('init', (next) => {
      if (req.params.id === 'new') {
        next()
        return
      }
      const query = this.populateField ? this.model.findById(req.params.id)
        .populate(this.populateField) :
        this.model.findById(req.params.id)
      query.exec((err, data) => {
        this.setGetLocal(locals, data)
        next(err)
      })
    })

    view.render(this.section)
  }

  create(req, res) {
    const Model = this.model
    const doc = new Model(this.addAdapterFn(req))

    doc.save((err, data) => {
      res.redirect(`/manage/${this.section}/${data._id}`)
    })
  }

  update(req, res, next) {
    this.model.findById(req.body.id).exec((err, item) => {
      const updated = _.merge(item, req.body)
      if (this.mixProp) updated.markModified(this.mixProp)

      updated.save((err, data) => {
        if (err) {
          console.log(err)
          return
        }

        res.redirect(`/manage/${this.section}/${data._id}`)
      })
    })
  }
}

module.exports = BaseController
