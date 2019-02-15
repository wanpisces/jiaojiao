module.exports = {
  setMyUserInfo: setMyUserInfo,//保存个人信息
  getLocation: getLocation,//授权获取用户地理位置
  showFailToast: showFailToast,//失败弹出框
  showSuccessToast: showSuccessToast,//成功弹出框
  getFormId: getFormId,//获取保存的formId
  setFormId: setFormId,//保存formId
  pageTo: pageTo,//控制页面跳转
  ages: ages//更具日期计算年龄
}
//保存个人信息
function setMyUserInfo(userInfo){
  wx.getStorage({
    key: 'userInfo',
    success: function (res) {
      var datas = res.data
      datas.data = userInfo
      wx.setStorage({
        key: "userInfo",
        data: datas
      })
    },
    fail: function (e) {
    }
  })
}
//授权获取用户地理位置
function getLocation(success, fail) {
  // fail(e)
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      success(res)
    }, fail: function (e) {
      fail(e)
      wx.showModal({
        title: '温馨提示',
        content: '请授权获取地理位置，可以更精准的提供街道选择',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userLocation"] == true) {
                  wx.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                      console.log('获取位置成功')
                      success(res)
                    }, fail: function (e) {
                      console.log('获取位置失败')
                    }
                  })
                } else {
                }
              }
            })
          } else if (res.cancel) {
          }
        }
      })
    }
  })
}
//获取保存的formId
function getFormId() {
  try {
    var value = wx.getStorageSync('formIdList')
    if (value) {
      return value
    } else {
      return null
    }
  } catch (e) {
    console.log("获取保存的formId失败")
    return null
  }
}
//保存formId
function setFormId(id) {
  wx.getStorage({
    key: 'formIdList',
    success: function (res) {
      console.log(res.data)
      var list = res.data
      if (list.length > 19) {
        list.pop();
        list.unshift(id)
      } else {
        list.unshift(id)
      }
      wx.setStorage({
        key: "formIdList",
        data: list
      })
    }, fail(e) {
      var list = []
      list.push(id)
      wx.setStorage({
        key: "formIdList",
        data: list
      })
    }
  })
}
//失败弹出框
function showFailToast(title, isImg) {
  wx.showToast({
    title: title,
    icon: isImg ? 'none' : 'none'
  })
}
//成功弹出框
function showSuccessToast(title,isImg) {
  wx.showToast({
    title: title,
    icon: isImg ? 'success' : 'none',
    duration: 2500
  })
}
// 控制页面跳转
function pageTo(url, type, _success, _fail) {
  if (typeof (type) == "undefined"){
    var type = 1
  }
  switch (type) {
    case 1:
      wx.navigateTo({
        url: url,
        success:function(res){
          typeof (_success) == 'function' && _success(res)
        },
        fail:function(e){
          typeof (_fail) == 'function' && _fail(e)
        }
      })
      break
    case 3:
      wx.switchTab({
        url: url,
        success: function (res) {
          typeof (_success) == 'function' && _success(res)
        },
        fail: function (e) {
          typeof (_fail) == 'function' && _fail(e)
        }
      })
      break
  }
}
//根据日期计算年龄
function ages(str) {
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r == null) return false;
  var d = new Date(r[1], r[3] - 1, r[4]);
  if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
    var Y = new Date().getFullYear();
    return ((Y - r[1]) + " 岁");
  }
  return "";
}  