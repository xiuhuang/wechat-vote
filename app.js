//app.js
let common = require('/utils/common.js');
App({
  onLaunch: function (path) {
    // console.log(path);
    // let query="";
    // let redirect_url="pages/index/index";
    // //判断是否带参数，若有则拼接成字符串
    // for(let i in path.query){
    //   if(i){
    //     query = query + i + "=" + path.query[i] +'&'
    //   }
    // }
    // if(query){
    //   redirect_url = path.path + "?" + query;
    // }else{
    //   redirect_url = path.path;
    // }
    
    //用户信息的判断
    // if (!wx.getStorageSync("openIdKey")) {
    //   wx.reLaunch({
    //     // url: 'pages/login/login?redirect_url' + encodeURIComponent("$/{redirect_url}"),
    //     url: 'pages/login/login',
    //   })
    //   return;
    // }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          this.globalData.code = res.code
          console.log(res)
           let _this = this;
           if(!this.globalData.sessionKey){
             common.getSessionKey(this.globalData.code, this, function (data) {
              // wx.reLaunch({
              //   url: '../../pages/login/login',
              // })
              return;
               // 获取用户信息
               wx.getSetting({
                 success: res => {
                   if (res.authSetting['scope.userInfo']) {
                     // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                   } else {
                     // 授权数据清除时
                     if (_this.userInfoMissCallback) {
                       _this.userInfoMissCallback(res)
                     }
                   }
                 },
                 fail: res => {
                   // 授权失败的处理
                 }
               })
             })
           }
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    baseUrl:'https://hello.grandhonor.net',
    openid:null,
    sessionKey:null,
    playerName:null,
    playerId:null,
    userInfo: null,
    appRes: null
  }
})