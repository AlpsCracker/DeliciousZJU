// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onclick: function (e) {
    wx.navigateTo({
      url: '/pages/test/testpage',
    });
  },
  ChangePage1: function (e) {
    wx.navigateTo({
      url: '/pages/itemDetails/itemDetails',
    });
  },
  ChangePage2: function (e) {
    wx.navigateTo({
      url: '/pages/takeawayDetails/takeawayDetails',
    });
  },

  ChangePage3: function (e) {
    wx.navigateTo({
      url: '/pages/scoreRecords/scoreRecords',
    });
  },
  ChangePage4: function (e) {
    wx.navigateTo({
      url: '/pages/information/information',
    });
  },
  ChangePage5: function (e) {
    wx.navigateTo({
      url: '/pages/favorites/favorites',
    });
  },
  ChangePage6: function (e) {
    wx.navigateTo({
      url: '/pages/myTakeaway/myTakeaway',
    });
  },
  ChangePage7: function (e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})