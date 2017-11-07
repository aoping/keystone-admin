// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId


/**
 * TopicCollect Model
 * =============
 */

const TopicCollect = new keystone.List('TopicCollect', {
  // map: { name: 'jsVersion' },
})

TopicCollect.schema.add({
  user_id: { type: ObjectId },
  topic_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now },
})

// 根据配置更新图片资源的域名
// TopicCollect.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


TopicCollect.register()
