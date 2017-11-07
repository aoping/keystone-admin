// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId
const Schema = keystone.mongoose.Schema

/**
 * Reply Model
 * =============
 */

const Reply = new keystone.List('Reply', {
  // map: { name: 'jsVersion' },
})

Reply.schema.add({
  content: { type: String },
  topic_id: { type: ObjectId },
  author_id: { type: ObjectId },
  reply_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  ups: [Schema.Types.ObjectId],
  deleted: { type: Boolean, default: false },
})

// 根据配置更新图片资源的域名
// Reply.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


Reply.register()
