// page/login/login.js
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
    wx.setNavigationBarTitle({
      title: '觉觉小'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#9661fa'
    });
  },
  myLogin:function(){
    wx.login({
      success: res => {
        console.log(res)
        // wx.request({
        //   url: my_configure.BASE_URL + 'api/loginByCode',
        //   method: "POST",
        //   data: { code: res.code, version: "v1.0.1" },
        //   success: function (res) {
        //     console.log(res)
        //     that.data.token = res.data.data.token
        //     that.data.userID = res.data.data.data.user_id
        //     that.data.userPhone = res.data.data.data.user_phone
        //     typeof (_success) == 'function' && _success(res.data.data.token)
        //     wx.setStorage({
        //       key: "userInfo",
        //       data: res.data.data
        //     })
        //   },
        //   fail: function (e) {
        //     console.log('获取token失败')
        //   },
        //   complete: function () {
        //     console.log('complete!');
        //   }
        // })
      }, fail: e => {
        console.log('获取code失败')
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
  
  }
})