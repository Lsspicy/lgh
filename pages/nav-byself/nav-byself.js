// pages/nav-byself/nav-byself.js
var proxy = require("../../libs/proxy.js");
var Pull = require("../../libs/doPull.js");
var BaseModel = proxy.BaseModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "http://lgh.citgroup.cn/mapImages/f6e7eb29c38743888d453ac51d83e073.jpg",
      "http://lgh.citgroup.cn/mapImages/a7f2ab44ec024dbf865db1f5d490f8f5.jpg"
    ],
    jqList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
      this.model = new BaseModel();
      this.model.loadData({
        path: "/tscenic/selectScenicesByApplet",
        success: function (res) {
          if(res.status == "SUCCESS"){
            console.log("请求成功", res.data);
            self.setData({
              getMore: self.model.hasNextPage(),
              jqList: res.data
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
  
  },
  //处理下拉事件
  pullListEnd: function (e) {
    var self = this;
    var pull = new Pull(function () {
      self.model.getNextPage();
    },"ManBody");
    pull.isListEnd(e);
  }
})