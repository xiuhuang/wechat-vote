// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    // redirect_url:'',
  },
  handleBackIndex(){
    wx.reLaunch({
      url: 'pages/index/index',
    })
  },
  //获取手机号
  getPhoneNumber: function (e) {
    let that = this;
    let phoneIv = encodeURIComponent(e.detail.iv)
    let eNcryptedData = encodeURIComponent(e.detail.encryptedData)
    let code = this.data.code;
    let self = this;
    console.log(data, iv)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          console.log('123')
        }
      })
    } else {
      if (this.data.loading || !iv || !encryptedData) {
        return;
      }
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        loading: true
      })
      wx.getStorage({
        key: 'openIdKey',
        success: function (res) {
          console.log(res.data)
          let openId = res.data.openid;
          let sessionKey = encodeURIComponent(res.data.sessionKey);
          //将获取到的数据发送给后端
          wx.request({
            url: app.globalData.baseUrl + '/v1/wechat/mobile',
            method: 'POST',
            header: {
              'content-type': 'appliaction/x-www-form-urlencoded',
              'uid': 'openId',
              'mob': ''
            },
            data: { code, iv, encryptedData },
            success: function (res) {
              if (self.data.code === 0) {
                wx.setStorageSync("openIdKey", this.data.session_key);
                wx.hideLoading();
                self.setData({
                  loading: false
                })
              }
              //登录后返回原页面
              // if(self.data.redirect_url){
              //   //根据来源改变路由
              //   wx.reLaunch({
              //     url: self.data.redirect_url,
              //   })
              // }else{
              //   wx.switchTab({
              //     url: 'pages/index/index',
              //   })
              // }
              wx.switchTab({
                url: 'pages/index/index',
              })

            },

          })

        },
      })
    }
    
    
  },

  //拍照功能
  getLocalImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        app.startOperating("保存中")
        var filePath = res.tempFilePaths[0];
        var session_key = wx.getStorageSync('session_key');
        // 这里顺道展示一下如何将上传上来的文件返回给后端，就是调用wx.uploadFile函数
        wx.uploadFile({
          url: app.globalData.baseUrl + '' + session_key,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            app.stopOperating();
            // 下面的处理业务逻辑
            var data = JSON.parse(res.data);
            if (parseInt(data.status) === 1) {
              app.showSuccess('文件保存成功');
            } else {
              app.showError("文件保存失败");
            }
          }
        })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    })
  },

  getLocal:function(){
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    this.setData({
      // redirect_url:encodeURIComponent(options, redirect_url)
    })
    wx.getStorage({
      key: 'openIdKey',
      success: function (res) {
        console.log(res.data)
      },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})