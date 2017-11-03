const keystone = require('keystone')
const middleware = require('./middleware')

const importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Import Route Controllers
const routes = {
  views: importRoutes('./../controller'),
}

// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index)
  app.get('/', routes.views.index)
}
