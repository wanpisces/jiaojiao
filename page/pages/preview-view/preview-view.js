// page/pages/preview-view/preview-view.js
var toolutils = require('../../../utils/tool-utils.js')
var httpUtils = require('../../../utils/https-utils.js')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var scene = decodeURIComponent(options.scene)
    getPreview(scene)
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
//获取相关数据
function getPreview(scene){
  if(!scene || scene== "undefined"){
    toolutils.showFailToast("scene为空")
    return
  }
  var params = {}
  params.key = scene
  httpUtils.getPreview(params,function(res){
    that.setData({
      news_title: res.news_title,
      visit_num: 0,
      star_num: 0,
      create_time: res.create_time,
      isStar: 1,
      isCollect: 1,
      favorites_num: 0,
      tags: JSON.parse(res.tags)
    })
    WxParse.wxParse('article', 'html', res.news_content, that);
  },function(e){
    toolutils.showFailToast(e.data.msg)
  })
}