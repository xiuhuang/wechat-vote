//index.js
let common = require('../../utils/common.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 10,
    background: [
      'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index_2.png',
      'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index_3.png',
      'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index_4.png'
    ],
    imgFix: 'scaleToFill', //aspectFit 图片缩放  widthFix 宽度满高度自适 scaleToFill 宽高完全拉伸至填满
    indicatorDots: true, //轮播点
    vertical: false, //是否纵向
    autoplay: true, //自动滚动
    circular: true, //衔接滑动
    interval: 4000, //动画时间
    duration: 800, //延迟时间
    disabled: true,
    items: {},
    restTime: '',
    checkTrue: null,
    day:'00天59小时59分59秒',
    // hou:'00',
    // min:'00',
    // sec:'00',
    timeTitle:'距离投票开始',
    endTime:'', //结束时间
    startTime:'', //开始时间
    alreadyAcquire:null, //记录授权状态 0 未授权 1为已授权
    voteStatus:null, //投票的状态
    tatolListLength:null,
    participator: 0, // 总参与者
    totalVotes: 0, // 总票数
    id:null,
    head:null,
    hidden: false,
    array: [{
      mode: 'aspectFit',
     },
    ],
    topImage:'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    //判断加载框
    if (that.data.loading){
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      loading: true
    })

    //判断是否是已经注册用户
    let beforeOpenId = (wx.getStorageSync('openIdKey', openId)).openid;
    let beforeMobile = (wx.getStorageSync('mobile', Mobile)).mobile;
    if (beforeOpenId && beforeMobile){
      console.log(beforeOpenId)
      console.log(beforeMobile)
      var openId= beforeOpenId;
      var Mobile= beforeMobile;
    }else{
      var openId = '';
      var Mobile = '';
    }
    console.log(openId)
    console.log(Mobile)
    //请求首页数据
    wx.request({
      url: app.globalData.baseUrl +'/v1/vote/index',
      data:'',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'uid': openId,
        'mob': Mobile,
      },
      success(res) {
        console.log(res)
        // 今天是否投过票 0 未投票 1 已投票 ,
        let oneVoteStatus = res.data.data.isVoted;
        console.log(oneVoteStatus)
        let tatolList = res.data.data.list
        let endTimeData = res.data.data.endTime
        let startTimeData = res.data.data.startTime
        let totalVotes = res.data.data.totalVotes
        let participator = res.data.data.list.length
        console.log('选手列表:', tatolList)
        console.log('结束时间:' + endTimeData)
        console.log('开始时间:' + startTimeData)
        console.log(that.data.day)      
        // console.log(indexTime)
        //判断是否已经获取手机号
        if (wx.getStorageSync('mobile')){
          console.log('已经授权手机号用户')
          //关闭 加载
          wx.hideLoading();
          that.setData({
            alreadyAcquire : 1,
            endTime: endTimeData,
            startTime: startTimeData,
            voteStatus: oneVoteStatus,
            items: tatolList,
            totalVotes: totalVotes,
            participator: participator,
            tatolListLength: tatolList.length,
            loading: false
          })
        } else {
          console.log('未授权手机号用户')
          //关闭 加载
          wx.hideLoading();
          that.setData({
            alreadyAcquire: 0,
            items: tatolList,
            endTime: endTimeData,
            startTime: startTimeData,
            voteStatus: oneVoteStatus,
            totalVotes: totalVotes,
            participator: participator,
            tatolListLength: tatolList.length,
            loading: false
          })

        }

      }
    })


  },

  // 点击手动加载
  loadMoreBtn:function(e){
    var that = this
    let mOtto = that.data.motto + 10;
    console.log(mOtto)
    if (!that.data.items){
      console.log('首页数据加载失败')
      that.onload()
    }
    if (mOtto > that.data.tatolListLength){
      that.setData({
        motto: mOtto,
      })
      wx.showToast({
        title: '加载完毕',
        icon: 'none',
        duration: 1500
      })
    }else{
      that.setData({
        motto: mOtto,
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    //判断加载框
    if (that.data.loading) {
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      disabled: true,
      loading: true,
    })
    //判断是否是已经注册用户
    var beforeOpenId = (wx.getStorageSync('openIdKey', openId)).openid;
    var beforeMobile = (wx.getStorageSync('mobile', Mobile)).mobile;
    if (beforeOpenId && beforeMobile) {
      console.log(beforeOpenId)
      var openId = beforeOpenId;
      var Mobile = beforeMobile;
    } else {
      var openId = '';
      var Mobile = '';
    }
    //请求首页数据
    wx.request({
      url: app.globalData.baseUrl + '/v1/vote/index',
      data: '',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'uid': openId,
        'mob': Mobile,
      },
      success(res) {
        console.log(res)
        // 今天是否投过票 0 未投票 1 已投票 ,
        let oneVoteStatus = res.data.data.isVoted;
        console.log(oneVoteStatus)
        let endTimeData = res.data.data.endTime
        let startTimeData = res.data.data.startTime
        let tatolList = res.data.data.list
        let totalVotes = res.data.data.totalVotes
        let participator = res.data.data.list.length
        // that.countDown(endTimeData)
        console.log('选手列表:', tatolList)
        console.log('总票数:' + totalVotes)
        //判断是否已经获取手机号
        if (wx.getStorageSync('mobile')) {
          console.log('已经授权手机号用户')
          //关闭 加载
          wx.hideLoading();
          that.setData({
            alreadyAcquire: 1,
            endTime: endTimeData,
            startTime: startTimeData,
            voteStatus: oneVoteStatus,
            items: tatolList,
            totalVotes: totalVotes,
            participator: participator,
            tatolListLength: tatolList.length,
            loading: false
          })
        } else {
          console.log('未授权手机号用户')
          //关闭 加载
          wx.hideLoading();
          that.setData({
            alreadyAcquire: 0,
            endTime: endTimeData,
            startTime: startTimeData,
            voteStatus: oneVoteStatus,
            items: tatolList,
            totalVotes: totalVotes,
            participator: participator,
            tatolListLength: tatolList.length,
            loading: false
          })

        }

      }
    })

  },
  
 
  //调转活动说明
  goActiviteShow:function(){
    wx.navigateTo({
      url: './activiteShow/activiteShow',
      success: function(res) {},
    })
  },
  //投票选择选手
  checkboxChange(e) {
    let index = e.currentTarget.dataset.id;  //获取用户当前选中的索引值
    let checkBox = this.data.items;
    console.log(this.data.voteStatus)
    if (this.data.voteStatus == 0){
      if (checkBox[index].checked) {
        this.data.items[index].checked = false;
      } else {
        this.data.items[index].checked = true;
      }
      this.setData({ items: this.data.items })
    } else if (this.data.voteStatus == 1){
      console.log('今天已投票')
    }
    
    //选中后票数+1
    // if (checkBox[index].checked == false) {
    //   let pickNumS = Number(this.data.items[index].votes) - 1;
    //   this.data.items[index].votes = pickNumS;
    // } else {
    //   let pickNumA = Number(this.data.items[index].votes) + 1;
    //   this.data.items[index].votes = pickNumA;
    // }
    // this.setData({ items: this.data.items });
    
    //返回用户选中的值
    let palyerId = checkBox.filter((item, index) => {
      return item.checked;
    })
    this.setData({
      checkTrue: palyerId.length
    })
    
    //判断用户未投票
    if (palyerId.length == 3 && !wx.getStorageSync('pickSuccess')) {
      console.log(palyerId)
      wx.setStorage({
        key: 'checkTrue',
        data: palyerId,
      })
      wx.setStorage({ 
        key: 'pickStatus',
        data: {
          palyerId: palyerId
        },
      })
      this.setData({
        disabled: false
      })
      //判断用户授权但是今天未投票
    } else if (palyerId.length == 3 && this.data.alreadyAcquire == 1){
      wx.setStorage({
        key: 'pickStatus',
        data: {
          palyerId: palyerId
        },
      })
      this.setData({
        disabled: false
      })
    } else if (palyerId.length > 3){
      wx.showToast({
        title: '最多只能选择三人',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        disabled: true
      })
    }else{
      this.setData({
        disabled: true
      })
    }

  },
  //投票后点击
  checkChange: function (e) {
    var that =this;
    console.log(e)
    if (that.data.voteStatus == 1){
      wx.showToast({
        title: '今天已投票',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //已经授权信息时投票
  getPick:function(e){
    var that=this;
    console.log('已经授权投票')
    // 投票
    var openId = (wx.getStorageSync('openIdKey', openId)).openid;
    var Mobile = (wx.getStorageSync('mobile', Mobile)).mobile;
    console.log(openId)
    console.log(Mobile)
    wx.getStorage({
      key: 'pickStatus',
      success: function (res) {
        console.log(res.data.palyerId)
        let cIdsData = res.data.palyerId;
        let cIdsDa = [];
        for (let i in cIdsData) {
          // cIdsDa += " " + (cIdsData[i].id).toString() + "," 
          cIdsDa.push(cIdsData[i].id)
        }
        console.log(cIdsDa)
        let cIds = cIdsDa.join(',', Number);
        console.log(cIds)
        wx.request({
          url: app.globalData.baseUrl + '/v1/vote/' + cIds,
          data: { cIds: cIds },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'uid': openId,
            'mob': Mobile
          },
          success: function (res) {
            console.log(res)
            console.log(res.statusCode)
            console.log(res)
            that.setData({
              disabled: true
            })
            if (res) {
              console.log(res)
              console.log(res.data.doneCode, res.data.doneMsg)
              wx.showToast({
                title: res.data.doneMsg,
                icon: 'success',
                duration: 2000,
                success:function(){
                  setTimeout(function(){
                    if (res.data.doneCode == 200) {
                      //投票成功存储的key
                      wx.setStorage({
                        key: 'pickSuccess',
                        data: 'OK',
                      })
                      //投票成功手动设置1
                      that.setData({
                        voteStatus: 1,
                      })
                    }
                    that.setData({
                      disabled: false
                    })
                    wx.showLoading({
                      title: '加载中',
                    })
                    that.setData({
                      loading: true
                    })
                    console.log(res)
                    //刷新首页数据
                    wx.request({
                      url: app.globalData.baseUrl + '/v1/vote/index',
                      data: '',
                      success(res) {
                        console.log(res)
                        let tatolList = res.data.data.list
                        let totalVotes = res.data.data.totalVotes
                        let participator = res.data.data.list.length
                        console.log("首页数据加载成功")
                        //关闭 加载
                        wx.hideLoading();
                        that.setData({
                          items: tatolList,
                          totalVotes: totalVotes,
                          participator: participator,
                          tatolListLength: tatolList.length,
                          loading: false,
                          disabled: true
                        })
                      }
                    }) 
                  },2000)
                  
                }
              })
            } else if (res.data.doneCode == 101){
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  if (res.code) {
                    this.globalData.code = res.code
                    console.log(res)
                    let _this = this;
                    if (!this.globalData.sessionKey) {
                      common.getSessionKey(this.globalData.code, this, function (data) {  })
                    }
                  }
                  wx.showLoading({
                    title: '加载中',
                  })
                  that.setData({
                    loading: true
                  })
                  console.log(res)
                  //刷新首页数据
                  wx.request({
                    url: app.globalData.baseUrl + '/v1/vote/index',
                    data: '',
                    success(res) {
                      console.log(res)
                      let tatolList = res.data.data.list
                      let totalVotes = res.data.data.totalVotes
                      let participator = res.data.data.list.length
                      console.log("首页数据加载成功")
                      //关闭 加载
                      wx.hideLoading();
                      that.setData({
                        items: tatolList,
                        totalVotes: totalVotes,
                        participator: participator,
                        tatolListLength: tatolList.length,
                        loading: false,
                        disabled: true
                      })
                    }
                  }) 

                }
              })
            }
            console.log(res)
             
          },
          fail: function (res) {
            console.log("投票失败");
              that.setData({
                disabled: false
              })
              wx.showLoading({
                title: '加载中',
              })
              that.setData({
                loading: true
              })
              console.log(res)
              //刷新首页数据
              wx.request({
                url: app.globalData.baseUrl + '/v1/vote/index',
                data: '',
                success(res) {
                  console.log(res)
                  let tatolList = res.data.data.list
                  let totalVotes = res.data.data.totalVotes
                  let participator = res.data.data.list.length
                  console.log("首页数据加载成功")
                  //关闭 加载
                  wx.hideLoading();
                  that.setData({
                    items: tatolList,
                    totalVotes: totalVotes,
                    participator: participator,
                    tatolListLength: tatolList.length,
                    loading: false,
                    disabled: true
                  })
                }
              })
          }
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail)
      let phoneIv = encodeURIComponent(e.detail.iv)
      let eNcryptedData = encodeURIComponent(e.detail.encryptedData)
      let that = this;
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '您必须授权之后才可以投票',
          success: function (res) {
            console.log('123')
            // that.setData({
            //   disabled: true,
            // })
          }
        })
    } else {
      console.log(111)
        wx.checkSession({
          success: function () {
            console.log(122)
            if (!phoneIv || !eNcryptedData) {
              return;
            }
            wx.getStorage({
              key: 'openIdKey',
              success: function (res) {
                console.log(res.data)
                let openId = res.data.openid;
                let session_key = encodeURIComponent(res.data.session_key);
                console.log(session_key)
                //将获取到的数据发送给后端
                wx.request({
                  url: app.globalData.baseUrl + '/v1/wechat/mobile?sessionKey=' + session_key + '&encryptedData=' + eNcryptedData + '&iv=' + phoneIv,
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'uid': openId,
                  },
                  data: {
                    encryptedData: eNcryptedData,
                    iv: phoneIv,
                    sessionKey: session_key
                  },
                  success: function (res) {
                    console.log('获取手机号成功')
                    console.log(res)
                    let Mobile = res.data.data.mobile;
                    wx.setStorage({
                      key: 'mobile',
                      data: {
                        mobile: Mobile
                      },
                    })
                    // 投票
                    wx.getStorage({
                      key: 'pickStatus',
                      success: function (res) {
                        console.log(res.data.palyerId)
                        let cIdsData = res.data.palyerId;
                        let cIdsDa = [];
                        for (let i in cIdsData) {
                          // cIdsDa += " " + (cIdsData[i].id).toString() + "," 
                          cIdsDa.push(cIdsData[i].id)
                        }
                        console.log(cIdsDa)
                        let cIds = cIdsDa.join(',', Number);
                        console.log(cIds)
                        wx.request({
                          url: app.globalData.baseUrl + '/v1/vote/' + cIds,
                          data: { cIds: cIds },
                          method: 'POST',
                          header: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'uid': openId,
                            'mob': Mobile
                          },
                          success: function (res) {
                            console.log(res)
                            if (res){
                              console.log(res.data.doneCode, res.data.doneMsg)
                              wx.showToast({
                                title: res.data.doneMsg,
                                icon: 'none',
                                duration: 2000,
                                success:function(){
                                  setTimeout(function () {
                                    if (res.data.doneCode == 200) {
                                      //投票成功存储的key
                                      wx.setStorage({
                                        key: 'pickSuccess',
                                        data: 'OK',
                                      })
                                      //投票成功手动设置1
                                      that.setData({
                                        voteStatus: 1,
                                      })
                                    }
                                    //刷新首页数据
                                    wx.request({
                                      url: app.globalData.baseUrl + '/v1/vote/index',
                                      data: '',
                                      header: {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                        'uid': openId,
                                        'mob': Mobile,
                                      },
                                      success(res) {
                                        console.log(res)
                                        let twoVoteStatus = res.data.data.isVoted; //今天是否投票
                                        let tatolList = res.data.data.list
                                        let totalVotes = res.data.data.totalVotes
                                        let participator = res.data.data.list.length
                                        console.log("首页数据加载成功")
                                        //关闭 加载
                                        wx.hideLoading();
                                        that.setData({
                                          alreadyAcquire: 1,
                                          items: tatolList,
                                          voteStatus: twoVoteStatus,
                                          totalVotes: totalVotes,
                                          participator: participator,
                                          tatolListLength: tatolList.length,
                                          loading: false,
                                          disabled: true
                                        })
                                      }
                                    })
                                  }, 2000)
                                  
                                }
                                
                              })
                            }                
                          },
                          fail: function (res) {
                            console.log("投票失败")
                            //刷新首页数据
                            wx.request({
                              url: app.globalData.baseUrl + '/v1/vote/index',
                              data: '',
                              header: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                'uid': openId,
                                'mob': Mobile,
                              },
                              success(res) {
                                console.log(res)
                                let twoVoteStatus = res.data.data.isVoted; //今天是否投票
                                let tatolList = res.data.data.list
                                let totalVotes = res.data.data.totalVotes
                                let participator = res.data.data.list.length
                                console.log("首页数据加载成功")
                                //关闭 加载
                                wx.hideLoading();
                                that.setData({
                                  alreadyAcquire: 1,
                                  items: tatolList,
                                  voteStatus: twoVoteStatus,
                                  totalVotes: totalVotes,
                                  participator: participator,
                                  tatolListLength: tatolList.length,
                                  loading: false,
                                  disabled: true
                                })
                              }
                            })
                          }
                        })
                      },
                    })

                  },

                })

              },
              fail:function(res){
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '您必须授权之后才可以投票',
                  success: function (res) {
                    // 登录
                    wx.login({
                      success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        if (res.code) {
                          this.globalData.code = res.code
                          console.log(res)
                          let _this = this;
                          if (!this.globalData.sessionKey) {
                            common.getSessionKey(this.globalData.code, this, function (data) { })
                          }
                        }
                      }
                    })
                    
                  }
                })
                
                //刷新首页数据
                wx.request({
                  url: app.globalData.baseUrl + '/v1/vote/index',
                  data: '',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'uid': '',
                    'mob': '',
                  },
                  success(res) {
                    console.log(res)
                    let twoVoteStatus = res.data.data.isVoted; //今天是否投票
                    let tatolList = res.data.data.list
                    let totalVotes = res.data.data.totalVotes
                    let participator = res.data.data.list.length
                    console.log("首页数据加载成功")
                    //关闭 加载
                    wx.hideLoading();
                    that.setData({
                      alreadyAcquire: 1,
                      items: tatolList,
                      voteStatus: twoVoteStatus,
                      totalVotes: totalVotes,
                      participator: participator,
                      tatolListLength: tatolList.length,
                      loading: false,
                      disabled: true
                    })
                  }
                })
              }
            })
          },
          fail: function () {
            console.log('sessionKey过期');
            // 登录
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                  this.globalData.code = res.code
                  console.log(res)
                  let _this = this;
                  if (!this.globalData.sessionKey) {
                    common.getSessionKey(this.globalData.code, this, function (data) {
                      return;
                    })
                  }
                }
              }
            })
          }
        })
    }
    that.setData({
      disabled:true
    })
  },

  onShareAppMessage: function (res) {
    withShareTicket: true;
    return {
      success: (res) => {
        console.log('转发成功', res)
      },
      fail: res => {
        console.log('转发失败', res)
      },
      title: '高重杯·职场奇葩说投票',
      path: '/pages/index/index',
      imageUrl:'https://yunossfiles.oss-cn-hangzhou.aliyuncs.com/vote/index.png'
    }
  },
  
})
