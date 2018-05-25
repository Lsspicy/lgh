var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "http://lgh.citgroup.cn/mapImages/f6e7eb29c38743888d453ac51d83e073.jpg",
      "http://lgh.citgroup.cn/mapImages/a7f2ab44ec024dbf865db1f5d490f8f5.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    wx.request({ 
      url: config.scenicDetails,
      data: {
        "pkScenic": 29
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        var data = res.data;
        // console.log(res.data.data);
        if(data.status == "SUCCESS" && data.data){
          var profile = data.data.scProfile;
          var logo =  config.host+data.data.scLogo;

          that.setData({
            profile: profile && (profile.slice(0,40)+"..."),
            logo:logo
          });
        }
     
      }
    });      
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
