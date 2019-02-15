// page/pack-index/pages/search-street/search-street.js
const toolUtils = require('../../../../utils/tool-utils.js')
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTxt:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.getStorage({
      key: 'searchStreetList',
      success: function (res) {
        that.setData({
          list:res.data
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
    that.setData({
      isClose: focus,
    })
  },
  //清除搜索框
  bindCancel: function (e) {
    this.setData({
      inputTxt: ''
    })
  },
  //确认搜索
  bindSearch: function (e) {
    var value = e.detail.value;
    if (value || '') {
      putData(value)
    }else{
      toolUtils.showFailToast('输入不能为空！')
      return
    }
  },
  //点击搜索按钮监听
  bindBntSearch:function(e){
    var value = e.detail.value.value;
    if (value || '') {
      putData(value)
    } else {
      toolUtils.showFailToast('输入不能为空！')
      return
    }
  },
  //动态输入监听
  bindinput:function(e){
    var cursor = e.detail.cursor
    var value = e.detail.value
    if (cursor > 0){
      if (!that.data.isClose){
        that.setData({
          isClose: true
        })
      }
    }else{
      if (that.data.isClose) {
        that.setData({
          isClose: false
        })
      }
    }
  },
  //选择了历史搜索
  bindItem:function(e){
    var index = e.currentTarget.dataset.index
    var value = that.data.list[index]
    putData(value)
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
//整理搜索数据
function putData(value){
  var pages = getCurrentPages()
  pages[pages.length-2].setData({
    search_name: value,
    refresh: true
  })
  var list = that.data.list
  if (list == null) {
    list = []
    list.unshift(value)
  } else {
    for (var i = 0; i < list.length; i++) {
      if (list[i] == value) {
        list.splice(i, 1);
        break;
      }
    }
    list.unshift(value); // 再添加到第一个位置
  }
  wx.setStorage({
    key: 'searchStreetList',
    data: list,
    success:function(){
      wx.navigateBack({
        delta:1
      })
    }
  })

}