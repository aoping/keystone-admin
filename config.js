const config = {
  // debug 为 true 时，用于本地调试
  debug: true,

  get mini_assets() { return !this.debug }, // 是否启用静态文件的合并压缩，详见视图中的Loader

  name: 'Nodeclub', // 社区名字
  description: 'CNode：Node.js专业中文社区', // 社区的描述
  keywords: 'nodejs, node, express, connect, socket.io',

  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 社区的域名
  host: 'localhost',
  // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
  google_tracker_id: '',
  // 默认的cnzz tracker ID，自有站点请修改
  cnzz_tracker_id: '',

  // mongodb 配置
  db: 'mongodb://127.0.0.1/node_club_dev',

  // 程序运行的端口
  port: 3001,

  // 话题列表显示的话题数量
  list_topic_count: 20,

  create_post_per_day: 1000, // 每个用户一天可以发的主题数
  create_reply_per_day: 1000, // 每个用户一天可以发的评论数
  create_user_per_ip: 1000,
  visit_per_day: 1000, // 每个 ip 每天能访问的次数
}

module.exports = config
