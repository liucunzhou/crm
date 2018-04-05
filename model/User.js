var config = require('../config.js');

function sycUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res.userInfo);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}

function sycOpenSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        var authSetting = res.authSetting;
        if (!authSetting['scope.userInfo']) {
          wx.openSetting({
            success: function (res) {
              resolve(res);
            },
            fail: function (res) {
              reject(false);
            }
          });
        }
      }
    });
  })
}

// 跳转到手机认证页面
function gotoCheckMobile(redirect) {
  wx.navigateTo({
    url: redirect
  })
}

// 获取提示语
function getCurrentPagePrompt()
{
  var prompt = '';
  var currentPage = getCurrentPages();
  var query = currentPage[0]['route'].split("/");
  if(query[1] == 'order') {
    prompt = '需要授权登录才能看订单哦!';
  } else if (query[1] == 'product') {
    prompt = '需要授权登录才能下单哦!';
  } else {
    prompt = '需要授权登录才能看订单哦!';
  }

  return prompt;
}

/**
 * 提示用户接受认证
 * 注册并认证过手机号的用户:
 * 1) 预约进店
 * 2) 在线下单
 * 3) 查看订单 
 */
function openUserAuth(app, that, redirect) {
  sycUserInfo().then(function (userInfo) {
    // 设置用户信息
    app.globalData.userInfo = userInfo;
    that.setData({
      userInfo: userInfo
    });

    if (!app.globalData.isMember) {
      sycRegister(app.globalData).then(function (regRes) {
        // 注册成功
        if (regRes.isMember == '1') {
          app.globalData.isMember = true;
        }

        if (!app.globalData.hasMobile) gotoCheckMobile(redirect);
      }, function (regRes) {
        // 注册异常
      });
    } else {
      if(!app.globalData.hasMobile) gotoCheckMobile(redirect);
    }

  }, function (res) {

    sycOpenSetting().then(function (openSetting) {
      if (openSetting['authSetting']['scope.userInfo']) {
        openUserAuth(app, that, redirect);
      } else {
        var prompt = getCurrentPagePrompt();
        wx.showModal({
          title: '提示',
          content: prompt,
          success: function (res) {
            if (res.confirm) {
              openUserAuth(app, that, redirect);
            } else if (res.cancel) {
              wx.navigateTo({url: '/pages/index/index'});
            }
          }
        });
      }
    })
  });
}

/**
 * 用户登录
 * 1) 获取用户code,openid,sessionkey
 * 2) 检测用户是否注册,并获取用户信息
 * 3) 检测用户是否认证手机号
 * 4) 将以上信息回传给app.globalData
 */
function login(that) {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: config.loginUrl,
          data: {
            code: res.code
          },
          success: function (result) {
            that.globalData.openid = result.data.openid
            // 检测是否是注册用户
            if (result.data.isMember == '1') {
              that.globalData.isMember = true;
            } else {
              that.globalData.isMember = false;
            }

            // 检测用户是否获取验证码
            if (result.data.hasMobile == '1') {
              that.globalData.hasMobile = true;
              that.globalData.mobile = result.data.mobile;
            } else {
              that.globalData.hasMobile = false;
            }
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}

/**
 * 用户注册
 * 1) 注册用户openid
 * 2) 注册用户微信用户信息: 包括openid,微信的nickname,sex,avater,country,province,city,town
 */
function sycRegister(globalData) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.registerUrl,
      data: {
        openid: globalData.openid,
        userInfo: globalData.userInfo
      },
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}

module.exports = {
  login: login,
  openUserAuth: openUserAuth
}