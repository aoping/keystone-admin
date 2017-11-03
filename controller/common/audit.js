const keystone = require('keystone')

const audit = (req, res, Model, section) => {
  const view = new keystone.View(req, res)
  const locals = res.locals

  view.on('init', (next) => {
    Model.findById(req.params.id, (err, result) => {
      locals.section = section
      locals.item = result

      next(err)
    })
  })

  view.render('audit')
}

module.exports = audit
