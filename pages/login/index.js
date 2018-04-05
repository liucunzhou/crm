// pages/login/index.js
const getMobileCodeUrl = require('../../config').getMobileCodeUrl;
const checkMobileCodeUrl = require('../../config').checkMobileCodeUrl;
var app = getApp();
var Order = app.loadModel("Order");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    VerifyCode: '获取验证码',
    code: '',
    mobile: '',
    productId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    if (options.id != undefined) {
      this.setData({
        userInfo: app.globalData.userInfo,
        productId: options.id
      });
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
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

  mobileInput: function (e) {
    var value = e.detail.value;
    if(value.length < 11) return false;
    this.setData({
      mobile: value
    });
  },

  // 获取手机验证码
  getMobileCode: function () {
    var that = this;
    var mobile = that.data.mobile;
    console.log(mobile);
    if (mobile == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
      });
      return false;
    }

    var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!reg.test(mobile)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
      });
      return false;
    }

    var total_micro_second = 60 * 1000;
    //验证码倒计时
    count_down(that, total_micro_second);

    wx.request({
      url: getMobileCodeUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        mobile: mobile
      },
      success: function (res) {
        if (res.data.code == "200") {
          wx.showModal({
            title: '提示',
            content: '发送验证码成功！',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    });
  },

  codeInput: function (e) {
    var value = e.detail.value;
    if (value.length < 4) return false;
    this.setData({
      code: value
    });

  },

  // 绑定手机号
  checkMobileCode: function (e) {
    var that = this;
    var code = this.data.code;
    var mobile = this.data.mobile;
    var openid = app.globalData.openid;

    if (code == '') {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
      });
      return false;
    }

    wx.request({
      url: checkMobileCodeUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        code: code,
        mobile: mobile,
        openid: openid
      },
      success: function (res) {
        if (res.data.code == '200') {
          
          app.globalData.hasMobile = true;
          app.globalData.mobile = mobile;

          if (that.data.productId == '') {
            wx.navigateBack({
              delta: 1
            })
          } else {
            Order.append(app, that, that.data.productId);
          }
        } else {
          wx.showModal({
            title: '绑定手机号提示',
            content: res.data.msg
          });
        }
      }
    })
  }
});

// 更新按钮文本
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送"
    });
    // timeout则跳出递归
    return;
  }

  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒"
  });

  // 倒计时
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10);
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}