# 觉觉小

#### 项目介绍
用于亚健康的失眠人群提供舒缓的音乐、视频和相应辅助睡眠的产品购买
该产品可以利用积分抵扣产品价格

#### 重点代码框架介绍
关于音乐播放：



播放：
js：
play() {
    let { audioList, audioIndex } = this.data;
    network.requestGet('/contents/' + audioList[audioIndex].id, {}, function (obj) {
      that.setData({
        curMusicObj: obj.data
      })
      //小程序切入后台，如果音频处于播放状态，可以继续播放
      const back = wx.getBackgroundAudioManager();
      back.src = obj.data.content.url;
      back.title = obj.data.title;
      back.coverImgUrl = obj.data.cover;
      back.play();
      //wx.playBackgroundAudio，当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
      // wx.playBackgroundAudio({
      //   dataUrl: obj.data.content.url,
      //   title: obj.data.title,
      //   coverImgUrl: obj.data.cover,
      //   success: function (re) {
      //     console.log('success',re);
      //   },
      //   fail: function (r) {
      //     console.log('fall',r);
      //   }
      // })
      let timer = setInterval(function(){
        that.setDuration(that);
      },1000);
    })
  },
  setDuration(that) {
      ////获取背景音乐播放状态
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
          //currentPosition：选定音频的播放位置
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          that.setData({
            currentPosition: that.stotime(currentPosition).substring(0,5),//当前播放时长
            duration: that.stotime(duration - currentPosition).substring(0, 5),//总时长
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },
  //处理音频时间
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }
      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },


设置进度条：
wxml:
<text class="slider-time" style='margin-right:20rpx;'>{{currentPosition === 0 ? '' : currentPosition}}</text>
      <slider
          value="{{sliderValue}}"
          bindchange="bindSliderchange"
          activeColor="#13beec"
          style="width: 62%;margin: 0;"
          block-size="12"
          block-color="#13beec"
        />
      <text class="slider-time"  style='margin-left:20rpx;'>{{duration === 0 ? '' : duration}}</text>

js:
    
    bindSliderchange: function (e) {
    let value = e.detail.value;//进度条的当前值
    let that = this;
    //获取背景音乐播放状态
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
          //duration：选定音频的长度
        let { status, duration } = res;
        //1：播放中，0：暂停中
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          //控制音乐播放进度,会触发 wx.onBackgroundAudioPlay(CALLBACK) 事件 ，也就是相当于在调整进度后，后台会自动的调用wx.playBackgroundAudio(OBJECT)函数
          wx.seekBackgroundAudio({
            position: value * duration / 100,//音乐位置
          })
        }
      }
    })
  },   


购买：
submitInfo(e) {
    let form = {
      address_id: that.data.curAddress.id,
      deliver_id: that.data.curDeliver.id,
      products: that.data.products,
      form_id: e.detail.formId
    };
    if (!form.address_id) {
      wx.showModal({
        title: '提示',
        content: '还未添加地址，是否去添加地址？',
        success: function (res) {
          if (res.confirm) {
            util.myPageGoto('/page/pack-mine/pages/add-address/add-address', 1)
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
      return false;
    }
    network.requestPost('/orders', form, function (res) {
      if (res.statusCode == 200) {
        network.requestPost('/orders/pay/' + res.data.id, {}, function (obj) {
          if (obj.statusCode == 200) {
              //调用支付
            wx.requestPayment({
              'timeStamp': obj.data.timeStamp,//时间戳
              'nonceStr': obj.data.nonceStr,//随机字符串
              'package': obj.data.package,//统一下单接口返回的 prepay_id 参数值
              'signType': 'MD5',//签名算法
              'paySign': obj.data.paySign,//支付签名
              'success': function (res1) {
                util.myPageGoto('/page/pack-mine/pages/pay-success/pay-success?id=' + res.data.id, 2)
              },
              'fail': function (res1) {
                util.myPageGoto('/page/pack-mine/pages/order-show/order-show?id=0', 2)
              }
            })
          }
        })
      }
    })
  },


