// pages/index/detail/detail.js
let common = require('../../../utils/common.js');
// 腾讯视频 插件
// const txvContext = requirePlugin("tencentvideo");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    college:null, //学校
    department:null, //院系
    desc:null, //描述
    name:null, //名字 
    head:null, //图片
    votes:null, //票数
    video:null, //视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id: options.id,
      college: options.college,
      department: options.department,
      desc:options.desc,
      name: options.name,
      head: options.head,
      votes: options.votes,
      video: options.video,
    })
    wx.showTabBar()
  },
  returnIndex:function(){
    wx.switchTab({
      url: '../index',
    });
  },
  returnRink: function () {
    console.log(1)
    // wx.redirectTo({
    //   url: '../../index2/index2'
    // })
    wx.switchTab({
      url: '../../index2/index2',
    });
    
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
  onShareAppMessage: function (res) {
    withShareTicket: true;
    return {
      success: (res) => {
        console.log('转发成功', res)
      },
      fail: res => {
        console.log('转发失败', res)
      },
      title: '快来给' + this.data.name+ '投票吧！',
      path: '/pages/index/index',
      imageUrl: 'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index.png'
    }
  },
})