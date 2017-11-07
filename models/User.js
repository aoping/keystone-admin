// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId


/**
 * User Model
 * =============
 */

const User = new keystone.List('User', {
  // map: { name: 'jsVersion' },
})

User.schema.add({
  name: { type: String },
  email: { type: String },
  url: { type: String },
  profile_image_url: { type: String },
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  avatar: { type: String },

})

// 根据配置更新图片资源的域名
// User.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


User.register()
