const keystone = require('keystone')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  const locals = res.locals

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'list'

  // Render the view
  view.render('list')
}
