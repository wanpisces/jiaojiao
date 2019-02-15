// pages/index/index.js
var toolutils = require('../../../utils/tool-utils.js')
var httpUtils = require('../../../utils/https-utils.js')
var that
var labelTop
var windowWidth //窗口可用宽度
var windowHeight //窗口可用高度
var app = getApp()
var mPageSize = 10//每页条数
var mTotalNum //总条数
var mCurrentPage = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:500,
    indicatorDots:true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    scrollTop: 100,
    curLabelIndex:3,
    labelList:['推荐','视频','音乐','音频'],
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
   
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '觉觉'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#9661fa'
    });
  },
  //tab切换
  switchTab:function(e){
    this.setData({
      curLabelIndex: e.currentTarget.dataset.index
    })
  },
  // banner切换时改变标题
  bannerChange: function (e) {
    var index = e.detail.current
    that.setData({
      banner_title: that.data.bannerList[index].banner_title,
      banner_index: index + 1
    })
  },
  onTabItemTap(item) {
    console.log(item)
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
    if (this.data.refresh) {
      this.setData({
        refresh: false
      })
      getNewsData()
    }

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
  // 下拉刷新
  onPullDownRefresh: function () {
    getData()
    that.setData({
      newTagName: null
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //搜索
  search: function () {
    // this.showZanToast('toast的内容');
    toolutils.pageTo('/page/pack-index/pages/search/search')
  },
  //页面滚动监听
  onPageScroll: function (e) {
    var top = e.scrollTop
    if (!viewFloat) {
      if (top > labelTop) {
        that.setData({
          isFloat: !viewFloat
        })
        viewFloat = true
      }
    } else {
      if (top < labelTop && endY - starY >10) {
        that.setData({
          isFloat: !viewFloat
        })
        wx.pageScrollTo({
          scrollTop: 0,
        })
        viewFloat = false
      }

    }
  },
  onbindtouchmove:function(e){
    endY = e.changedTouches[0].clientY
  },
  onbindtouchstart:function(e){
    starY = e.changedTouches[0].clientY
    endY = 0
  },
  onNavClick: function (e) {
    var item = e.detail.target.dataset.item
    bannerAndNav(item.nav_run_type, item.nav_web_url)
  },
  onBannerClick: function (e) {
    var item = e.detail.target.dataset.item
    bannerAndNav(item.banner_run_type, item.banner_web_url)
  },
})
//获取首页上半部分数据
function getData() {
  var params = {}
  if (!!app.data.token) {
    params.token = app.data.token
  }
  var StreetInfo = app.getStreetInfo()
  if (StreetInfo && StreetInfo.group_id) {
    params.group_id = StreetInfo.group_id
  }
  httpUtils.getIndex(params, function (res) {
    //保存社区信息
    if (res.group_info.group_type == 1){
      wx.setStorage({
        key: "streetInfo",
        data: res.group_info
      })
      app.data.streetInfo = res.group_info
      that.setData({
        group_name:res.group_info.group_name
      })
    }
  
    //处理nav的数据
    var nav = res.nav
    var list1 = []
    var list2 = []
    for (var i = 0; i < nav.length; i++) {
      list1.push(nav[i])
      if ((i + 1) % 10 == 0) {
        list2.push(list1)
        list1 = []
      }
      if (i == nav.length - 1) {
        if (list1.length != 0) {
          list2.push(list1)
        }
      }
    }
    //计算nv这部分高度
    var navHeight = 0
    if (nav.length==0){
      labelTop = windowWidth * 490 / 750
      navHeight = 0
    }else if(nav.length<=5 ){
      labelTop = windowWidth * 640 / 750
      navHeight = 140
    } else if (nav.length <= 10){
      labelTop = windowWidth * 780 / 750
      navHeight = 280
    }else{
      labelTop = windowWidth * 812 / 750
      navHeight = 312
    }
    //首页栏目
    that.setData({
      bannerList: res.banner,
      banner_title: res.banner.length > 0 ? res.banner[0].banner_title : '',
      banner_index: res.banner.length > 0 ? 1 : 0,
      nav: list2,
      navHeight: navHeight,
      authList: res.official_news,
      labelList: res.category,
      toLabel: 'label0',
      categoryId: res.category.length>0?res.category[0].category_id||-1:-1
    })
    getNewsData()
    wx.stopPullDownRefresh()
  }, function (e) {
    wx.stopPullDownRefresh()
  })
}
//获取首页资讯部分
function getNewsData(msg) {
  var params = {}
  var StreetInfo = app.getStreetInfo()
  if (StreetInfo && StreetInfo.group_id) {
    params.group_id = StreetInfo.group_id
  }
  // if (that.data.categoryId > 0) {
    params.run_in = 1
    params.category_id = that.data.categoryId
  // } else {
  //   params.run_in = 4
  // }
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
  }, msg)
}
//banner和nav的跳转
//falg 跳转方式 1=原生  2=h5,
//url 地址
function bannerAndNav(falg, url) {
  try{
    if (!url) {
      toolutils.showFailToast("路径错误")
      return
    }
    if (falg == 1) {
      toolutils.pageTo(url, 1)
    } else if (falg == 2) {
      app.data.url = url
      toolutils.pageTo("/page/tabBar/my-webview/my-webview", 1)
    }
  }catch(e){

  }

}