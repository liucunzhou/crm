/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "https://small.koreavisit.cn/api.php?m=Api&";

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}c=User&a=login`,

    // 用户注册
    registerUrl: `${host}c=User&a=register`,

    // 获取手机验证码
    getMobileCodeUrl: `${host}c=User&a=getMobileCode`,

    // 验证手机号
    checkMobileCodeUrl: `${host}c=User&a=checkMobileCode`,

    // 首页url
    indexUrl: `${host}c=Index&a=index`,

    // 用code换取openId
    openIdUrl: `${host}/openid`,

    // 产品详情页
    detailsUrl: `${host}c=Product&a=details`,

    // 未支付订单列表
    unpaidUrl: `${host}c=Order&a=unpaid`,

    // 已支付订单列表
    paidUrl: `${host}c=Order&a=paid`,

    // 订单详情页
    orderDetails: `${host}c=Order&a=details`,

    // 生成订单的接口
    appendUrl: `${host}c=Order&a=append`,

    // 预约进店
    appointmentUrl: `${host}c=Appointment&a=index`,

    // 订单支付接口
    paymentUrl: `${host}c=Payment&a=index`,

    // 取消订单接口
    cancelOrderUrl: `${host}c=Order&a=cancel`,

    // 购物车列表
    cartUrl: `${host}c=Cart&a=index`,

    // 添加到购物车
    appendCart: `${host}c=Cart&a=append`,

    // 发送模板消息接口
    templateMessageUrl: `${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `${host}/static/weapp.jpg`
};

module.exports = config
