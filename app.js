//app.js
var User = require('./model/User.js');

App({
    onLaunch: function () {
        var _this = this;
        
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        User.login(_this);
    },
    globalData: {
        openid: '',
        userInfo: '',
        isMember: false,
        hasMobile: false,
        isOpenAuth: false,
        phone: '15021312010'
    },
    loadModel: function(modelName) {
      return require('./model/' + modelName + '.js');
    }
})