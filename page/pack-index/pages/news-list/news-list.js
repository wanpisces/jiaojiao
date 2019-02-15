// pages/index/news_list/news_list.js
var httpUtils = require('../../../../utils/https-utils.js')
var that
var mPageSize = 10//每页条数
var mTotalNum //总条数
var mCurrentPage = 1
var mOptions
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var title = options.title ? options.title : '资讯列表'
    wx.setNavigationBarTitle({
      title: title
    })
    mCurrentPage = 1
    mOptions = options
    getNewsData("加载中...")
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
    mCurrentPage==1
    getNewsData('刷新中...')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (mTotalNum > mPageSize * mCurrentPage) {
      ++mCurrentPage
      that.setData({
        loadData: {
          searchLoading: true, //"上拉加载"的变量，默认false，隐藏  
          searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
        }
      })
      getNewsData()
    } else {
      that.setData({
        loadData: {
          searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
          searchLoadingComplete: true  //“没有数据”的变量，默认false，隐藏  
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//获取资讯列表
function getNewsData(msg) {
  var params = { run_in: 1 }
  var StreetInfo = app.getStreetInfo()
  if (StreetInfo && StreetInfo.group_id) {
    params.group_id = StreetInfo.group_id
  }
  params.run_in = mOptions.run_in
  switch (mOptions.run_in) {
    case '1'://栏目模块区
      var categoryId = mOptions.category_id
      // if (categoryId == -1) {
      //   categoryId = 0
      //   params.run_in = 4
      // }
      params.category_id = categoryId
      break
    case '2'://轮播区
      break
    case '3'://官方快报
      break
    case '4'://推荐
      break
    default:
    console.log("run_in错误")
  }
  params.current_page = mCurrentPage
  params.page_size = mPageSize
  httpUtils.getNews(params, function (res) {
    mTotalNum = res.total_num
    var list = that.data.dataList
    if (mCurrentPage == 1) {
      list = []
    }
    list = list.concat(res.list)
    if (list.length == mTotalNum) {
      that.setData({
        dataList: list,
        loadData: {
          searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
          searchLoadingComplete: true  //“没有数据”的变量，默认false，隐藏  
        }
      })
    } else {
      that.setData({
        dataList: list,
        loadData: {
          searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
          searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
        }
      })
    }
    wx.stopPullDownRefresh()
  }, function (e) {
    if (mCurrentPage > 1) {
      --mCurrentPage
    }
    that.setData({
      loadData: {
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
        searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
      }
    })
    wx.stopPullDownRefresh()
  }, msg)
}