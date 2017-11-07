// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId


/**
 * Message Model
 * =============
 */

const Message = new keystone.List('Message', {
  // map: { name: 'jsVersion' },
})

Message.schema.add({
  type: { type: String },
  master_id: { type: ObjectId },
  author_id: { type: ObjectId },
  topic_id: { type: ObjectId },
  reply_id: { type: ObjectId },
  has_read: { type: Boolean, default: false },
  create_at: { type: Date, default: Date.now },
})

// 根据配置更新图片资源的域名
// Message.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


Message.register()
