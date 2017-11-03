// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
const path = require('path')
require('dotenv').config({ path: (path.join(__dirname, 'config/admin.config')) })

// Require keystone
const keystone = require('keystone')
const config = require('./config')
const lodash = require('lodash')

keystone.init({
  'name': 'keystone-admin',
  'brand': 'keystone-admin',

  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'views',
  'view engine': 'pug',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'N',
})
keystone.import('models')
keystone.set('locals', {
  _: lodash,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
})
keystone.set('routes', require('./routes'))

keystone.set('nav', {
  ns: 'ns',
})

keystone.set('port', config.port)
keystone.set('host', config.host)

keystone.start()
