// const Util = require('./../util')
const keystone = require('keystone')

const Types = keystone.Field.Types
const Mixed = keystone.mongoose.Schema.Types.Mixed
const ObjectId = keystone.mongoose.Schema.Types.ObjectId


/**
 * Hotfix Model
 * =============
 */

const Hotfix = new keystone.List('Hotfix', {
  map: { name: 'jsVersion' },
})

Hotfix.schema.add({
  jsVersion: { type: String, default: '' },
  androidMinVersion: { type: String, default: '' },
  iosMinVersion: { type: String, default: '' },
  projectId: { type: ObjectId, refs: 'HybridProject' }, // 所属项目
  localUrl: { type: String, default: '' }, // 地址
  qnKey: { type: String, default: '' }, // 七牛地址
  jsBundleMd5: { type: String, default: '' }, // 存储jsbundle的MD5
  createdAt: { type: Date, default: Date.now },
  creator: { type: String, default: '' }, // 上传人
  isReleased: { type: Boolean, default: false }, // 是否发布了
  releaseAt: { type: Date, default: Date.now }, // 发布时间
  releasor: { type: String, default: '' }, // 发布人
  isDeleted: { type: Boolean, default: false }, // 是否删除了
  deleteAt: { type: Date, default: Date.now }, // 删除时间
  deletor: { type: String, default: '' }, // 删除人
  isSuccess: { type: Boolean, default: false }, // 是否生成成功, 生成md5和增量包
  jsPatchs: [], // 生成的增量包名称
  jsPatchsQnKey: [], // 七牛生成的增量包名称
  describe: { type: String, default: '' }, // 描述
})

// 根据配置更新图片资源的域名
// Hotfix.schema.methods.qnUrlAdapter = function() {
//   let that = this
//   that.qnKey = Util.getQnUrl(this.qnKey)

//   Object.keys(that.jsPatchsQnKey).forEach(item => {
//   that.jsPatchsQnKey[item] = Util.getQnUrl(that.jsPatchsQnKey[item])
//   })

//   // that.forTest = downloadHost ? downloadHost : 'hallo world'

//   return that
// }


Hotfix.register()
