//原云函数入口函数代码
const application = require('./framework/core/application.js');

// 云函数入口函数
exports.main = async (event, context) => {
	return await application.app(event, context);
}
/*
// 云函数入口函数
const application = require('./framework/core/application.js');
const MsgSecCheckController = require('./framework/controller/msg_sec_check_controller.js'); // 新增控制器

// 扩展路由配置（具体方式需参考你的框架文档）
application.route({
  '/msg-sec-check': MsgSecCheckController.check
});

exports.main = async (event, context) => {
  return await application.app(event, context);
}*/