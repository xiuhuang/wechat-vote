// pages/index2/index2.js
let common = require('../../utils/common.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getRanking();
    
  },

  //下拉刷新
  // onPullDownRefresh:function() {
  //   alert(123)
  //   wx.hideNavigationBarLoading()
  //   var that = this;
  //   var beforeOpenId = (wx.getStorageSync('openIdKey', openId)).openid;
  //   var beforeMobile = (wx.getStorageSync('mobile', Mobile)).mobile;
  //   if (beforeOpenId && beforeMobile) {
  //     console.log(beforeOpenId)
  //     var openId = beforeOpenId;
  //     var Mobile = beforeMobile;
  //   } else {
  //     var openId = '';
  //     var Mobile = '';
  //   }
  //   console.log(openIdKey)
  //   wx.request({
  //     url: app.globalData.baseUrl + '/v1/vote/rank',
  //     data: '',
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       'uid': openId,
  //       'mob': Mobile
  //     },
  //     success(res) {
  //       console.log(res)
  //       let seNData = res.data.data.list
  //       console.log(seNData.length)
  //       that.setData({
  //         ranking: seNData,
  //       })
  //       setTimeout(function () {
  //         wx.showToast({
  //           title: '刷新成功',
  //           icon: 'success',
  //           duration: 1500
  //         })
  //       }, 1500)
  //     },
  //     fail: function (res) {
  //       console.log(res.data.msg);
  //     },
  //     complete: function () {
  //       setTimeout(() => {
  //         wx.stopPullDownRefresh()
  //       }, 2000)
  //     }

  //   })
    
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getRanking: function () {
    var that = this;
    var openIdKey = wx.getStorageSync('openIdKey');
    var mobile = wx.getStorageSync('mobile');
    if (openIdKey && mobile) {
      console.log(openIdKey)
      var openId = openIdKey.openid;
      var Mobile = mobile.Mobile;
    } else {
      var openId = '';
      var Mobile = '';
    }
    console.log(openIdKey)
    wx.request({
      url: app.globalData.baseUrl + '/v1/vote/rank',
      data: '',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'uid': openId,
        'mob': Mobile
      },
      success(res) {
        console.log(res)
        let seNData = res.data.data.list
        console.log(seNData.length)
        that.setData({
          ranking: seNData,
        })
      },
      fail: function (res) {
        console.log(res.data.msg);
      },
      complete: function () {
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getRanking();
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