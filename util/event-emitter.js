// 事件列表
const EventList = {
  reDeploy: 'reDeploy', // 重新发布时，api 数据结构可能有变，也需要刷新 redis 缓存
  updateModel: 'updateModel', // 数据库数据有更新，刷新 redis 缓存
  updateFlightRef: 'updateFlightRef', // 更新 Flight 的引用计数
}

const EventEmitter = require('events').EventEmitter

class Emitter extends EventEmitter {
  constructor() {
    super()
  }
}

class ProxyEmitter {
  constructor(eventList) {
    this.emitter = new Emitter()
    this.emitter.setMaxListeners(20) // default 10

    this.eventList = eventList

    this.emitter.on('error', (err) => {
      this.logEventErr('error', err)
    })
  }

  on(eventName, callback) {
    const event = this.eventList[eventName]

    if (!this.checkEvent(event)) return

    this.emitter.on(event, callback)
  }

  emit(eventName, arg) {
    const event = this.eventList[eventName]

    if (!this.checkEvent(event)) return

    this.emitter.emit(event, arg)
  }

  checkEvent(name) {
    if (!this.eventList[name]) {
      this.logEventErr('event not in EventList', 'event not found')
      return false
    }

    return true
  }

  static logEventErr(type, err) {
    console.log(`[ProxyEmitter.js] Emitter ${type}`)
    console.log(err)
  }
}

module.exports = {
  emitter: new ProxyEmitter(EventList),
  events: EventList,
}
