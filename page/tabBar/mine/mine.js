// pages/mine/mine.js
var toolUtils = require('../../../utils/tool-utils.js')
var httpUtils = require('../../../utils/https-utils.js')
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#9661fa'
    });
    that = this
    httpUtils.selectAuthorze("scope.userInfo", function (isAuthorze) {
      that.setData({
        isAuthorzeUserInfo: isAuthorze
      })
      if (isAuthorze){
        httpUtils.getMyUser(function (res) {
          that.setData({
            userInfo: res
          })
          app.data.userPhone = res.user_phone
          toolUtils.setMyUserInfo(res)
        }, function (e) {
        })
      }
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

  },
  //我的详情
  onMineDetail: function () {
    toolUtils.pageTo('/page/pack-mine/pages/mine-details/mine-details', 1)
  },
  //授权获取个人信息
  userInfoHandler: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      that.setData({
        isAuthorzeUserInfo: true
      })
      var userInfo = e.detail.userInfo
      var param = {}
      param.user_avatar = userInfo.avatarUrl
      param.user_nickname = userInfo.nickName
      param.user_gender = userInfo.gender
      httpUtils.updateUserInfo(param, function (res1) {
        that.setData({
          userInfo: res1
        })
        toolUtils.showFailToast("更新个人信息成功")
      }, function (e) {

      })
    }
  },
  //点击需要获取个人信息的栏目处理
  onItemClick: function (e) {
    switch (e.currentTarget.id) {
      case "collection"://我的收藏
        toolUtils.pageTo('/page/pack-mine/pages/mine-collection/mine-collection', 1)
        break
      case "comment"://我的评价
        toolUtils.pageTo('/page/pack-mine/pages/mine-comment/mine-comment', 1)
        break
      case "footprint"://我的足迹
        toolUtils.pageTo('/page/pack-mine/pages/mine-footprint/mine-footprint', 1)
        break
      case "customer-help"://客服与帮助
        toolUtils.pageTo('/page/pack-mine/pages/customer-help/customer-help', 1)
        break
    }
  }
})
//更新个人信息
function updateUserInfo(param) {
  httpUtils.updateUserInfo(param, function (res) {

  }, function (e) {
    console.log(e)
  })
}