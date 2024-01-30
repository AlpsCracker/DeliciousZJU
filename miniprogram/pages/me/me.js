// pages/me/me.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    UserAvatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
    UserName:"微信用户",
    show: false
  },
  showPopup() {
    this.setData({ show: true });
  },
  toScoreRecords: function(e)
  {
    wx.navigateTo({
      url: '/pages/scoreRecords/scoreRecords',
    });
  },
  toFavorites: function(e)
  {
    wx.navigateTo({
      url: '/pages/favorites/favorites',
    });
  },
  toFeedback: function(e)
  {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    });
  },
  toMyTakeaway: function(e)
  {
    wx.navigateTo({
      url: '/pages/myTakeaway/myTakeaway',
    });
  },
  toInformation: function(e)
  {
    wx.navigateTo({
      url: '/pages/information/information',
    });
  },
  toThumbs: function(e)
  {
    wx.navigateTo({
      url: '/pages/thumbs/thumbs',
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  changeUserInformtion(e)
  {
    this.setData({ show: true });
  },
  onChooseAvatar(e) {
    const {avatarUrl} = e.detail 
    this.setData({
      avatarUrl,
    })
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