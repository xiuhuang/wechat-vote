//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

    // banner图片高度
  // getImgHeight: function (e) {
  //   var that= this;
  //   var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
  //   var imgh = e.detail.height;//图片高度
  //   var imgw = e.detail.width;//图片宽度
  //   var swiperH = winWid * imgh / imgw + "px"
  //   that.setData({
  //     imgHeight: swiperH//设置高度
  //   })
  // },

  // getNowTime: function () {
  //   var endTime_ = this.data.endTime;
  //   // 获取当前时间，同时得到活动结束时间数组
  //   var startTime_ = this.data.startTime;
  //   let startTime = new Date(startTime_).getTime();
  //   var newTime = new Date().getTime();
  //   // 对结束时间进行处理渲染到页面
  //   let endTimeNow = new Date(endTime_).getTime();
  //   let obj = null;
  //   var that = this;
  //   if (startTime > newTime) {
  //     var resTime = (startTime - newTime) / 1000;
  //     that.setData({
  //       timeTitle: '距离投票开始',
  //       day: that.getNewTime(resTime),
  //     })
  //   } else
  //     if (startTime <= newTime && newTime < endTimeNow) {
  //       var resTime = (endTimeNow - newTime) / 1000;
  //       // console.log(startTime, newTime)
  //       that.setData({
  //         timeTitle: '投票正在进行中',
  //         day: that.getNewTime(resTime),
  //       });
  //     } else if (endTimeNow <= newTime) { //投票已结束
  //       that.setData({
  //         timeTitle: '投票已结束',
  //         day: '2019年 5月 20日 59小时 59分 59秒',
  //       });
  //     }
  // },
  // //将时分秒转化成二位数格式
  // toDouble: function (n) {
  //   return n < 10 ? "0" + n : n;
  // },
  // getNewTime: function (resTime) {
  //   var that = this;
  //   // 获取天、时、分、秒
  //   let day = that.toDouble(parseInt(resTime / (60 * 60 * 24)));
  //   let hou = that.toDouble(parseInt(resTime % (60 * 60 * 24) / 3600));
  //   let min = that.toDouble(parseInt(resTime % (60 * 60 * 24) % 3600 / 60));
  //   let sec = that.toDouble(parseInt(resTime % (60 * 60 * 24) % 3600 % 60));
  //   return day + '天' + hou + '小时' + min + '分' + sec + '秒'

  // },
  // countDown: function (endTimeData) {
  //   var that = this;
  //   that.setData({
  //     restTime: endTimeData
  //   })
  //   setInterval(function () {
  //     // console.log(that.data.day)
  //     that.getNowTime()
  //     that.setData({
  //       day: that.data.day
  //     })
  //     // that.onLoad();
  //   }, 1000)

  // },

})
