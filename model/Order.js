var config = require('../config.js');

// 添加订单
function append(app, that, productId) {
  var User = app.loadModel('User');
  var options = {
    rtype: 'redirect',
    referer: '/pages/product/details/index?id=' + productId,
    url: '/pages/login/index?id=' + productId
  };
  var url = '/pages/login/index?id=' + productId;
  User.openUserAuth(app, that, url);

  // 在用户认证过手机号后才能生成订单
  if (app.globalData.hasMobile) {
    wx.request({
      url: config.appendUrl,
      data: {
        openid: app.globalData.openid,
        id: productId
      },
      method: 'PUT',
      success: function (res) {
        if (res.data.orderId > 0) {
          wx.navigateTo({
            url: '/pages/order/details/index?id=' + res.data.orderId
          })
        } else {
          wx.showModal({
            title: '错误提示',
            content: '生成订单失败,请稍后再试.',
          });
        }
      }
    });
  }
}

// 预约到店
function appointment(app, that, productId, mobile) {
  var User = app.loadModel('User');
  var url = '/pages/login/index';
  // 检验用户是否
  User.openUserAuth(app, that, url);

  // 只有认证过手机号后才能预约到店
  wx.request({
    url: config.appointmentUrl,
    data: {
      openid: app.globalData.openid,
      id: productId,
      mobile: mobile
    },
    method: 'PUT',
    success: function (res) {
      console.log(res);
      wx.showModal({
        title: '提示',
        content: res.data.msg
      })
    }
  });

}

// 调用支付接口
function payment(openid, orderId) {
  wx.request({
    url: config.paymentUrl + '&openid=' + openid + '&id=' + orderId,
    success: function (res) {
      var payargs = res.data;
      wx.requestPayment({
        timeStamp: '' + payargs.timeStamp,
        nonceStr: payargs.nonceStr,
        package: payargs.package,
        signType: payargs.signType,
        paySign: payargs.paySign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/order/paid/index',
          });
        }
      });
    }
  });
}

// 加载数据
function loadList(that, globalData, url) {
  wx.showLoading();
  wx.request({
    url: url + '&openid=' + globalData.openid,
    success: function (res) {
      wx.hideLoading();
      that.setData({
        orderList: res.data.orderList
      });
    },
    complete: function (res) { }
  })
}

module.exports = {
  append: append,
  payment: payment,
  appointment: appointment,
  loadList: loadList
}