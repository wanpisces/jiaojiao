const URL = require('../utils/URL.js');
const network = require('../utils/network.js');
const my_configure = require('../utils/my-configure.js');
module.exports = {
  getZwgkIndex: getZwgkIndex,//政务公开首页
  getZwgkNews: getZwgkNews,//政务公开资讯列表
  getZwgkAttr: getZwgkAttr,//政务公开资讯分类
  getZwgkNewsDetails: getZwgkNewsDetails,//政务公开资讯资讯详情
  getZwgkStreetDetails: getZwgkStreetDetails,//政务公开街道详情
  getZwgkCommunityDetails: getZwgkCommunityDetails,//政务公开社区详情
  getBaznAttr: getBaznAttr,//办事指南分类
  getBaznEvent: getBaznEvent,//办事指南列表
  getBaznEventDetails: getBaznEventDetails//办事指南详情
}
//政务公开首页
function getZwgkIndex(params, _success, _fail) {
  var url = URL.zwgkIndexURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//政务公开资讯列表
function getZwgkNews(params, _success, _fail) {
  var url = URL.zwgkNewsURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//政务公开资讯分类
function getZwgkAttr(id, params, _success, _fail) {
  var url = URL.zwgkAttrURL + id
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//政务公开资讯资讯详情
function getZwgkNewsDetails(id, params, _success, _fail) {
  var url = URL.zwgkNewsDetailsURL + id
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//政务公开街道详情
function getZwgkStreetDetails(id, params, _success, _fail) {
  var url = URL.zwgkStreetDetailsURL + id
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//政务公开社区详情
function getZwgkCommunityDetails(id, params, _success, _fail) {
  var url = URL.zwgkCommunityDetailsURL + id
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//办事指南分类
function getBaznAttr(params, _success, _fail) {
  var url = URL.baznAttrURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//办事指南列表
function getBaznEvent(params, _success, _fail) {
  var url = URL.baznEventURL
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}
//办事指南详情
function getBaznEventDetails(id, params, _success, _fail) {
  var url = URL.baznEventDetailsURL + id
  network.requestGetLoading(url, params, "加载中...", _success, _fail, true)
}