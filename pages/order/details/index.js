const orderDetails = require('../../../config').orderDetails;
const paymentUrl = require('../../../config').paymentUrl;
var app = new getApp();
var Order = app.loadModel('Order');
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
    wx.request({
      url: orderDetails + '&id=' + options.id,
      success: function(res){
        that.setData({
          order: res.data.order,
          product: res.data.product
        })
      }
    })
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

  payment: function (e) {
    var openid = app.globalData.openid;
    var orderId = e.target.dataset.id;
    Order.payment(openid, orderId);
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone
    })
  }
})