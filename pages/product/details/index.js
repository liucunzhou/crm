// Order/details/index
const detailsUrl = require('../../../config').detailsUrl;
var app = new getApp();
var Order = app.loadModel('Order');

Page({
  data: {
    maskDisplay: 'hide',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (option) {
    var self = this;
    var originalWidth = 400;
    var originalHeight = 300;
    var imageHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        var imageWidth = res.windowWidth - 20;
        imageHeight = (imageWidth * originalHeight) / originalWidth;
      }
    })
    this.setData({
      mobile: app.globalData.mobile,
      swiperHeight: imageHeight
    });

    wx.showLoading();
    wx.request({
      url: detailsUrl + '&id=' + option.id + '&openid=' + app.globalData.openid,
      success: function (result) {
        wx.hideLoading();
        self.setData({
          picList: result.data.picList,
          product: result.data.product,
          package: result.data.package,
          details: result.data.details,
          cartCount: result.data.cartCount
        });
      }
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 分享产品信息
  onShareAppMessage: function () {
    return {
      title: this.data.product.title,
      path: '/pages/product/details/index?id=' + this.data.product.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 立即购买
   */
  buyIt: function (e) {
    var that = this;
    Order.append(app, that, this.data.product.id);
  },

  showAppointment: function (e) {
    this.setData({
      maskDisplay: 'show',
      myanimate: 'myanimate',
      bottom: 0
    });
  },

  hideMask: function (e) {
    this.setData({
      maskDisplay: 'hide',
      bottom: '-148px'
    });
  },
  // 预约进店
  appointment: function (e) {
    var that = this;
    var mobile = this.data.mobile;
    var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!reg.test(mobile)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
      });
      return false;
    }

    Order.appointment(app, that, this.data.product.id, mobile);
    this.setData({
      maskDisplay: 'hide',
      myanimate: 'myanimate',
      bottom: '-148px'
    });
  },

  mobileInput: function (e) {
    var mobile = e.detail.value;
    if (mobile.length == 11) {
      var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
      if (!reg.test(mobile)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的手机号',
        });
        return false;
      }
      var mobile = mobile.replace(/\s/g, "");
      this.setData({
        mobile: mobile
      });
    }
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone
    })
  }
});
