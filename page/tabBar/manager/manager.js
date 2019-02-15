// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list1: [{ img: 'https://img.darongshutech.com/20180228165023_rmrb.png', txt:'不断完善公共文化服务体系 积极 推动文化产业发展',time:'2小时前',num1:26,num2:5124},
      { img: 'https://img.darongshutech.com/20180228165235_rmrb.png', txt: '倍感“傲娇” 文化强省的四川答卷', time: '2小时前', num1: 26, num2: 5124 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("toekn" + getApp().data.token)
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