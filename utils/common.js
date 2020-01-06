// 获取session_key
function getSessionKey(code, app, callback) {
  console.log(code);
  wx.request({
    url: app.globalData.baseUrl + '/v1/wechat/login?code=' + code,
    method: 'POST',
    data: {
      'code': code
    },
    success: res => {
      console.log(res)
      if (res.statusCode == 200) {
        var data = res.data
        if (data.doneCode == 0) {
          var appData = data.data;
          console.log(appData)
          app.globalData.openid = appData.openid
          app.globalData.sessionKey = appData.sessionKey
          wx.setStorage({
            key: 'openIdKey',
            data: {
              openid: appData.openid,
              session_key: appData.sessionKey,
            },
          })
          return callback(data)
        }
      }
      return callback()
    },
    fail: res => {
      return callback()
    }
  })
}

// 获取getUserPhone
function getUserPhone(res, app, callback) {
  var userInfo = res.userInfo
  wx.request({
    url: app.globalData.baseUrl  ,
    method: 'POST',
    data: {
      'encryptedData': res.encryptedData,
      'iv': res.iv,
      'openid': app.globalData.openid,
      'sessionKey': app.globalData.sessionKey,
    },
    success: res => {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.icode == 0) {
          var appData = data.idata
          if (appData) {
            wx.setStorage({
              key: 'userid',
              data: appData,
            })
            if (callback) {
              return callback(appData)
            }
          }
        }
        if (callback) {
          return callback()
        }
      }
    },
    fail: function () {
      if (callback) {
        return callback()
      }
    }
  })
}
// 常规请求
function commonGet(url, params, app, callback) {
  wx.request({
    url: app.globalData.baseUrl + url,
    method: 'GET',
    data: params,
    success: res => {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.icode == 0) {
          return callback(data.idata)
        }
      }
      return callback()
    },
    fail: res => {
      return callback()
    }
  })
}
// 常规请求
function commonPost(url, params, app, callback) {
  wx.request({
    url: app.globalData.baseUrl + url,
    method: 'POST',
    data: params,
    success: res => {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.icode == 0) {
          return callback(data.idata)
        }
      }
      return callback()
    },
    fail: res => {
      return callback()
    }
  })
}
/** 获取缓存的用户id */
function getCookieUserid() {
  var userid = wx.getStorageSync('userid')
  if (userid) {
    return userid
  } else {
    return 0
  }
}


module.exports.getSessionKey = getSessionKey
module.exports.getUserPhone = getUserPhone
module.exports.commonGet = commonGet
module.exports.commonPost = commonPost
module.exports.getCookieUserid = getCookieUserid