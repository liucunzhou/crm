// pages/order/unpaid/index.js
const unpaidUrl = require('../../../config').unpaidUrl;
const paymentUrl = require('../../../config').paymentUrl;
const cancelOrderUrl = require('../../../config').cancelOrderUrl;
var app = getApp();
var Order = app.loadModel('Order');
var User = app.loadModel('User');

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    User.openUserAuth(app, that, '/pages/login/index');

    // 加载数据
    Order.loadList(that, app.globalData, unpaidUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  payment: function (e) {
    var openid = app.globalData.openid;
    var orderId = e.target.dataset.id;
    Order.payment(openid, orderId);
  },

  cancelOrder: function (e) {
    var isConfirm = false;
    wx.showModal({
      title: '提示',
      content: '确认删除此订单么?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: cancelOrderUrl,
            data: {
              openid: app.globalData.openid,
              id: e.target.dataset.id
            },
            method: 'PUT',
            success: function (res) {
              if (res.data.code == '200') {
                wx.navigateTo({
                  url: 'index',
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                });
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone
    })
  }
})