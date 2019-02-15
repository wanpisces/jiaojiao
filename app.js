//app.js
const my_configure = require('/utils/my-configure.js');
var that
App({
  data: {
    // my_tags: getMyTags(),
    // recom_tags: getRecomTags(),
    userPhone:'',
    token: '',
    userID:''
  },
  onLaunch: function () {
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
    try {
      var value = wx.getStorageSync('streetInfo')
      if (value) {
        this.data.streetInfo = value
      }else{
        this.data.streetInfo = null
      }
    } catch (e) {
      this.data.streetInfo = null
    }
  },
  onShow: function () {
    that = this
  },
  //获取token
  getToken: function (_success) {
    wx.checkSession({
      success: function (res) {
        if (that.data.token || '') {
          _success(that.data.token)
          console.log(1)
        } else {
          wx.getStorage({
            key: 'userInfo',
            success: function (res) {
              that.data.token = res.data.token
              that.data.userID = res.data.data.user_id
              that.data.userPhone = res.data.data.user_phone
              _success(res.data.token)
            },
            fail: function (e) {
              myLogin(_success)
            }
          })
        }
      },
      fail: function (res) {
        myLogin(_success)
      }
    })

  },
  //刷新token
  getRefreshToken: function (_success) {
    myLogin(_success)
  },
})
//登录
function myLogin(_success) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res)
      wx.request({
        url: my_configure.BASE_URL+'api/loginByCode',
        method: "POST",
        data: { code: res.code, version: "v1.0.1"},
        success: function (res) {
          console.log(res)
          that.data.token = res.data.data.token
          that.data.userID = res.data.data.data.user_id
          that.data.userPhone = res.data.data.data.user_phone
          typeof (_success) == 'function' && _success(res.data.data.token)
          wx.setStorage({
            key: "userInfo",
            data: res.data.data
          })
        },
        fail: function (e) {
          console.log('获取token失败')
        },
        complete: function () {
          console.log('complete!');
        }
      })
    }, fail: e => {
      console.log('获取code失败')
    }
  })
}
