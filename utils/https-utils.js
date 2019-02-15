const URL = require('../utils/URL.js');
const network = require('../utils/network.js');
const my_configure = require('../utils/my-configure.js');
const bmap = require('../libs/bmap-wx.js');
module.exports = {
  getQuestionList: getQuestionList,//常见问题列表
  getPreview: getPreview,//预览
  getService: getService,//服务首页
  putFeedBack: putFeedBack,//用户反馈
  getUserFootPrint: getUserFootPrint,//我的足迹
  getUserComment: getUserComment,//我的评价
  getUserFavorites: getUserFavorites,//我的收藏
  getMyUser: getMyUser,//同步个人信息
  uploadImgs: uploadImgs,//上传图片
  decrypt: decrypt,//数据解码
  getHotwords: getHotwords,//获取搜索的热门词
  getNewsSearch: getNewsSearch,//首页资讯搜索
  getLocate: getLocate,//通过经纬度获取街道
  getCommentDetail: getCommentDetail,//评论详情
  getCommentList: getCommentList,//评论列表
  putComment: putComment,//评论
  putFavorite: putFavorite,//收藏
  putStar: putStar,//点赞
  putShare: putShare,//分享
  getNewsDetail: getNewsDetail,//获取资讯详情
  putEditCategory: putEditCategory,//修改我的栏目
  getCategory: getCategory,//获取栏目
  getNews: getNews,//资讯列表
  getIndex: getIndex,//首页数据
  loginByCode: loginByCode,//通过code登录接口
  getArea: getArea,//区域接口
  getWXBaiDuLocation: getWXBaiDuLocation,//百度定位
  getWXBaiDuLocationToName: getWXBaiDuLocationToName,//百度地图通过经纬度获取名字 
  updateUserInfo: updateUserInfo,//更新个人信息
  streetSearch: streetSearch,//街道搜索
  selectAuthorze: selectAuthorze,//查询是否获取某种授权
  authorizeUserInfo: authorizeUserInfo//授权获取用户信息
}
//常见问题列表
function getQuestionList(params, _success, _fail) {
  var url = URL.questionURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//预览
function getPreview(params, _success, _fail){
  var url = URL.decodePreviewURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//服务首页
function getService(params, _success, _fail){
  var url = URL.serviceURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//用户反馈
function putFeedBack(params, _success, _fail){
  getApp().getToken(function (token) {
    var url = URL.feedbackURL
    params.token = token
    network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
  })
}
//我的足迹
function getUserFootPrint(params, _success, _fail){
  getApp().getToken(function (token) {
    var url = URL.userFootPrintURL
    params.token = token
    network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
  })
}
//我的评价
function getUserComment(params, _success, _fail) {
  getApp().getToken(function (token) {
    var url = URL.userCommentURL
    params.token = token
    network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
  })
}
//我的收藏
function getUserFavorites(params, _success, _fail) {
  getApp().getToken(function (token) {
    var url = URL.userFavoritesURL
    params.token = token
    network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
  })
}
//获取个人信息
function getMyUser(_success, _fail) {
  getApp().getToken(function (token) {
    var params = {}
    params.token = token
    var url = URL.userInfoURL
    network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
  })
}

//上传图片
function uploadImgs(imgs, success) {
  var url = URL.uploadsURL
  network.uploadFiles(url, '图片上传中...', imgs, function (res) {
    success(res)
  })
}
//数据解码
function decrypt(params, _success, _fail) {
  var url = URL.decryptURL
  network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
}
//获取搜索的热门词
function getHotwords(params, _success, _fail) {
  var url = URL.hotwordsURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//首页资讯搜索
function getNewsSearch(params, _success, _fail) {
  var url = URL.newsSearchURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//通过经纬度获取街道
function getLocate(params, _success, _fail) {
  var url = URL.locateURL
  network.requestGetLoading(url, params, "加载中...", _success , _fail, true)
}
//评论详情
function getCommentDetail(commentID, params, _success, _fail) {
  var url = URL.commentURL + '/' + commentID
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//评论列表
function getCommentList(params, _success, _fail, isRestart) {
  var url = URL.commentURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, isRestart)
}
//评论
function putComment(params, _success, _fail) {
  // authorizeUserInfo(false, function (data) {
  //   if (data.isAuthorze) {
      var url = URL.commentURL
      network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
    // } else {
    //   _fail()
    // }
  // })

}

//收藏
function putFavorite(params, _success, _fail) {
  // authorizeUserInfo(false, function (data) {
  //   if (data.isAuthorze) {
      var url = URL.favoriteURL
      network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
  //   } else {
  //     _fail()
  //   }
  // })
}
//点赞
function putStar(params, _success, _fail) {
  // authorizeUserInfo(false, function (data) {
  //   if (data.isAuthorze) {
      var url = URL.starURL
      network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
    // } else {
    //   _fail()
    // }
  // })
}
//分享
function putShare(params, _success, _fail) {
  // authorizeUserInfo(false, function (data) {
  //   if (data.isAuthorze) {
      var url = URL.shareURL
      network.requestPostLoading(url, params, "加载中...", _success, _fail, true)
    // } else {
    //   _fail()
    // }
  // })
}
//资讯详情
function getNewsDetail(newID, params, _success, _fail) {
  var url = URL.newsDetailURL + newID
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//修改我的栏目
function putEditCategory(params, _success, _fail) {
  var url = URL.editCategoryURL
  network.requestPutLoading(url, params, "修改中...", _success, _fail, true)
}
//获取栏目
function getCategory(params, _success, _fail) {
  var url = URL.categoryURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//首页数据
function getNews(params, _success, _fail, msg) {
  var url = URL.newsURL
  if (!params) {
    params = {}
  }
  network.requestGetLoading(url, params, msg ? msg : '', _success, _fail, false)
}
//首页数据
function getIndex(params, _success, _fail) {
  var url = URL.indexURL
  if (!params) {
    params = {}
  }
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//街道搜索
function streetSearch(keyWord, _success, _fail) {
  var url = URL.streetSearchURL
  var param = {}
  param.q = keyWord
  network.requestGetLoading(url, param, "搜索中...", _success, _fail, true)
}
//更新个人信息
function updateUserInfo(param, _success, _fail) {
  getApp().getToken(function (token) {
    var url = URL.updateUserInfoURL
    param.token = token
    network.requestPutLoading(url, param, "信息更新中...", function (res2) {
      _success(res2)
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          var datas = res.data
          datas.data = res2
          wx.setStorage({
            key: "userInfo",
            data: datas
          })
        },
        fail: function (e) {
        }
      })
    }, _fail, true)
  }
  )
}
// 通过code登录
function loginByCode(_success, _fail) {
  var url = URL.loginByCodeURL
  network.requestPostLoading(url, {}, "登录中...", _success, _fail, true)
}
/*
*区域接口 
*id:表示父级区域ID,例如: 0 获取所有省份
*/
function getArea(id, _success, _fail) {
  var url = URL.areaURL
  var param = {}
  param.upper_region = id
  network.requestGetLoading(url, param, "加载中...", _success, _fail, true)
}
//百度地图定位
function getWXBaiDuLocation(_success, fail) {
  var BMap = new bmap.BMapWX({
    ak: my_configure.baiDuAK
  });
  BMap.getWXLocation('wgs84', function (res) {
    _success(res)
  }, function (e) {
    fail(e)
    wx.showModal({
      title: '温馨提示',
      content: '请授权获取地理位置，可以更精准的提供街道选择',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"] == true) {
                BMap.getWXLocation('wgs84', function (res) {
                  console.log('获取位置成功')
                  _success(res)
                }, function (e) {
                  console.log('获取位置失败')
                }
                )
              } else {
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }, function (c) {

  })
}
//百度地图通过经纬度(gcj02坐标)获取城市名字
function getWXBaiDuLocationToName(lat, lng, success1, fail) {
  var BMap = new bmap.BMapWX({
    ak: my_configure.baiDuAK
  });
  var locations = lat + ',' + lng
  wx.request({
    url: URL.baiduURL,
    data: {
      location: locations,
      output: 'json',
      coordtype: 'gcj02',
      pois: 1,
      ak: my_configure.baiDuAK
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      success1(res.data.result)
    }, fail: function (e) {
      console.log("经纬度解析失败")
      fail(e)
    }, complete: function (c) {

    }
  })

}
//查询是否获取某种授权
function selectAuthorze(scope, call) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) {
        call(false)
        return
      }
      call(true)
      return
    }
  })
}
//获取个人信息并同步更新
function getUserInfoToUpdate(success, fail) {
  wx.getUserInfo({
    success: function (res) {
      getApp().getToken(function (token) {
        var param = {}
        param.token = token
        param.user_avatar = res.userInfo.avatarUrl
        param.user_nickname = res.userInfo.nickName
        param.user_gender = res.userInfo.gender
        success(res)
        updateUserInfo(param, function (res1) {

        }, function (e) {

        })
      })
    }, fail: function (e) {
      fail(e)
    }
  })
}
//isUpdate:是否同步更新服务器数据
//用户是否授权获取用户信息，
function authorizeUserInfo(isUpdate, call) {

  selectAuthorze("scope.userInfo", function (isAuthorze) {
    if (isAuthorze) {
      if (isUpdate) {
        getUserInfoToUpdate(function (res) {
          var data = {
            isAuthorze: isAuthorze,
            userInfo: res
          }
          call(data)
          return
        }, function (e) {
          var data = {
            isAuthorze: isAuthorze,
            userInfo: null
          }
          call(data)
          return
        })
      }
      var data = {
        isAuthorze: isAuthorze,
        userInfo: null
      }
      call(data)
      return
    } else {
      getUserInfoToUpdate(function (res) {
        var data = {
          isAuthorze: true,
          userInfo: res
        }
        call(data)
        return
      }, function (e) {
        wx.showModal({
          title: '温馨提示',
          content: '请授权获取个人信息',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userInfo"] == true) {
                    getUserInfoToUpdate(function (res) {
                      var data = {
                        isAuthorze: true,
                        userInfo: res
                      }
                      call(data)
                      return
                    }, function (e) {
                      var data = {
                        isAuthorze: true,
                        userInfo: null
                      }
                      call(data)
                    })
                    return
                  } else {
                    var data = {
                      isAuthorze: false,
                      userInfo: null
                    }
                    call(data)
                    return
                  }
                }
              })
            } else if (res.cancel) {
              var data = {
                isAuthorze: false,
                userInfo: null
              }
              call(data)
              return
            }
          }
        })
      })
    }
  })

}