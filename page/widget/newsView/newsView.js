var httpUtils = require('../../../utils/https-utils.js')
var that
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    list:{
      type: Array,
      value: []
    },
    //数据为空时显示
    empty:{
      type:Object,
      value: {
        icon: '/pic/nodata.png',
        txt: '暂无数据...'
      }
    },
    isFull:{
      type: Boolean,
      value: false
    },
    loadData:{
      type: Object,
      value: {
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
        searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
      }
    }    
  },
  data: {
    // 这里是一些组件内部数据
    // empty:{
    //   icon:'/pic/nodata.png',
    //   txt:'暂无数据...'
    // }
  },
  attached: function () {

  },
  methods: {
    // 这里是一个自定义方法

  }
})
