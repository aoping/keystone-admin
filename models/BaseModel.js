const proxy = require('./../util/event-emitter')

/**
 * 扩展所有Model
 */

const lastModifed = function (next) {
  this.updatedAt = new Date()

  const modelName = this.collection.name

  // 广播 Model 更新事件
  proxy.emitter.emit(proxy.events.updateModel, modelName)
  next()
}

module.exports = function (schema) {
  const schemaPath = {
    updatedAt: Date,
  }

  // 给所有 Model 添加 updatedAt 字段
  schema.add(schemaPath)

  schema.pre('save', lastModifed)
  schema.pre('update', lastModifed)
}
