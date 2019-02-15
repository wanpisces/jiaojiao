var configure = require('../utils/my-configure.js');//请求地址
module.exports = {
  baiduURL: 'https://api.map.baidu.com/geocoder/v2/',//通过百度将经纬度转化为地址
  areaURL: configure.BASE_URL + 'api/area',//区域接口
  uploadsURL: configure.BASE_URL + 'public/uploads',//上传文件
  loginByCodeURL: configure.BASE_URL + configure.ADDRESS + '/loginByCode',//通过code登录
  updateUserInfoURL: configure.BASE_URL + configure.ADDRESS + '/updateUserInfo',//更新个人信息
  streetSearchURL: configure.BASE_URL + configure.ADDRESS + '/streetSearch',//街道搜索
  indexURL: configure.BASE_URL + configure.ADDRESS + '/index',//首页地址
  newsURL: configure.BASE_URL + configure.ADDRESS + '/news',//资讯列表
  categoryURL: configure.BASE_URL + configure.ADDRESS + '/category',//获取栏目
  editCategoryURL: configure.BASE_URL + configure.ADDRESS + '/user/category',//编辑栏目
  newsDetailURL: configure.BASE_URL + configure.ADDRESS + '/news/',//资讯详情
  commentURL: configure.BASE_URL + configure.ADDRESS + '/comment',//评论接口
  favoriteURL: configure.BASE_URL + configure.ADDRESS + '/favorites',//收藏
  starURL: configure.BASE_URL + configure.ADDRESS + '/star',//收藏
  shareURL: configure.BASE_URL + configure.ADDRESS + '/share',//分享成功调
  locateURL: configure.BASE_URL + configure.ADDRESS + '/locate',//通过经纬度获取街道
  newsSearchURL: configure.BASE_URL + configure.ADDRESS + '/newsSearch',//首页资讯搜索
  hotwordsURL: configure.BASE_URL + configure.ADDRESS + '/hotwords',//获取搜索的热门词
  decryptURL: configure.BASE_URL + configure.ADDRESS + '/decrypt',//数据解码
  userInfoURL: configure.BASE_URL + configure.ADDRESS + '/userInfo',//数据解码
  userFavoritesURL: configure.BASE_URL + configure.ADDRESS + '/userFavorites',//数据解码
  userCommentURL: configure.BASE_URL + configure.ADDRESS + '/userComment',//我的评价
  userFootPrintURL: configure.BASE_URL + configure.ADDRESS + '/userFootPrint',//我的足迹
  feedbackURL: configure.BASE_URL + configure.ADDRESS + '/feedback',//用户反馈
  questionURL: configure.BASE_URL + configure.ADDRESS + '/question',//常见问题列表

  // 服务相关
  serviceURL: configure.BASE_URL + configure.ADDRESS + '/service',//服务首页
  //政务公开
  zwgkIndexURL: configure.BASE_URL + 'zwgk/index',//政务公开首页
  zwgkNewsURL: configure.BASE_URL + 'zwgk/news',//政务公开资讯列表
  zwgkAttrURL: configure.BASE_URL + 'zwgk/attr/',//政务公开资讯分类
  zwgkNewsDetailsURL: configure.BASE_URL + 'zwgk/news/',//政务公开资讯资讯详情
  zwgkStreetDetailsURL: configure.BASE_URL + 'zwgk/group/',//政务公开街道详情
  zwgkCommunityDetailsURL: configure.BASE_URL + 'zwgk/group/sub/',//政务公开社区详情
  //办事指南
  baznAttrURL: configure.BASE_URL + 'bszn/attr',//办事指南分类
  baznEventURL: configure.BASE_URL + 'bszn/event',//办事指南列表
  baznEventDetailsURL: configure.BASE_URL + 'bszn/event/',//办事指南详情


  //预览
  decodePreviewURL: configure.BASE_URL + configure.ADDRESS + '/decodePreviewViewQR'
}