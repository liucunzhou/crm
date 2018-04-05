// index/index
const indexUrl = require('../../config').indexUrl;
var app = getApp();
// 引用用户模块
var User = app.loadModel('User');

Page({
  data: {},
  onLoad: function (options) {
    var self = this;
    wx.showLoading();
    wx.request({
      url: indexUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        setTimeout(function(){
          wx.hideLoading();
        }, 1000);
        
        app.globalData.phone = result.data.phone;
        self.setData({
          hot: result.data.hot,
          recommend: result.data.recommend
        });
      }
    })
  },
  onReady: function () {
  },
  onShow: function () {
    app.globalData.isMember
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    return {
      title: '韩国艺匠婚纱摄影',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone
    })
  }
})