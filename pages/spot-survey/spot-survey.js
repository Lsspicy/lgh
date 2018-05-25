var config = require('../../config.js');
// pages/w-hotel-details/w-hotel-details.js
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    imgUrls: [
      "http://lgh.citgroup.cn/mapImages/f6e7eb29c38743888d453ac51d83e073.jpg",
      "http://lgh.citgroup.cn/mapImages/a7f2ab44ec024dbf865db1f5d490f8f5.jpg"
    ],
    Height: 0,
    scale: 12,
    menpiao:0,
    time:0,
    address:0,
    recomand:0,
    latitude: "",
    longitude: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../image/sub.png',
      position: {
        left: 300,
        top: 100 - 50,
        width: 18,
        height: 18
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../../image/add.png',
      position: {
        left: 330,
        top: 100 - 50,
        width: 18,
        height: 18
      },
      clickable: true
    }
    ],
    circles: []

  },

  onLoad: function () {
    var _this= this ,self = this;

    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });

    
    wx.request({
      url: config.scenicDetails,
      data: JSON.stringify({
        pkScenic: "29"
      }),
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       wx.hideToast();
        //res.data为我们自己后台的返回
       var data = res.data;
       console.log(data);
       if(data.status=="SUCCESS" && data.data){

         var dt = data.data;
         self.setData({
           simple: dt.scProfile,
           time: dt.scOpentime,
           address: dt.scAddress,
           recomand: dt.scPlaytime,
           menpiao: dt.scMny
         });

         WxParse.wxParse('scDescribe', 'html', dt.scDescribe,self);
       }
      }
    })


    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {

        _this.setData({
          latitude: 27.719701, 
          longitude: 100.795441,
          markers: [{
            id: "1",
            latitude: 27.719701,
            longitude: 100.795441,
            width: 20,
            height: 20,
            iconPath: "../../image/location0.png",
            title: "石林"

          }],
          //    circles: [{
          //      latitude: 24.8129432897,
          //      longitude: 103.3243775368,
          //      color: '#FF0000DD',
          //      fillColor: '#7cb5ec88',
          //      radius: 3000,
          //      strokeWidth: 0.1
          //    }]

        })
      }

    })

  },

  regionchange(e) {
    // console.log("regionchange===" + e.type)
  },

  //点击merkers
  //  markertap(e) {
  //    console.log(e.markerId)

  //    wx.showActionSheet({
  //       itemList: ["A"],
  //       success: function (res) {
  //         console.log(res.tapIndex)
  //       },
  //       fail: function (res) {
  //         console.log(res.errMsg)
  //       }
  //    })
  //  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    // console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      // if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }


  },


})