// page/widget/tabBarView/tabBarView.js
var that
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBar: {
      type: Array,
      value: []
    },
    selectId:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function () {
    that = this
   },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换tabBar
    tabBarChange: function (e) {
      var myEventDetail = e.currentTarget
      var myEventOption = {}
      this.triggerEvent('onclick', myEventDetail, myEventOption)

      var tabBar = that.data.tabBar
      var index = e.currentTarget.dataset.index
      if (index == 0) {
        tabBar[0].checked = true
        tabBar[1].checked = false
        tabBar[2].checked = false
      } else if (index == 1) {
        tabBar[0].checked = false
        tabBar[1].checked = true
        tabBar[2].checked = false
      } else {
        tabBar[0].checked = false
        tabBar[1].checked = false
        tabBar[2].checked = true
      }
      that.setData({
        tabBar: tabBar
      })
    }
  }
})
