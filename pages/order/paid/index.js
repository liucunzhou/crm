// pages/order/paid/index.js
const paidUrl = require('../../../config').paidUrl;
var app = getApp();
var Order = app.loadModel('Order');
var User = app.loadModel('User');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    User.openUserAuth(app, that, '/pages/login/index');
    // 加载数据
    Order.loadList(that, app.globalData, paidUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone
    })
  }
})