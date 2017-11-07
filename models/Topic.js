// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId


/**
 * Topic Model
 * =============
 */

const Topic = new keystone.List('Topic', {
  // map: { name: 'jsVersion' },
})

Topic.schema.add({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  top: { type: Boolean, default: false }, // 置顶帖
  good: { type: Boolean, default: false }, // 精华帖
  lock: { type: Boolean, default: false }, // 被锁定主题
  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  tab: { type: String },
  deleted: { type: Boolean, default: false },
})

// 根据配置更新图片资源的域名
// Topic.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


Topic.register()
