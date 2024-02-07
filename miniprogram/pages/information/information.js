// pages/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AvatarUrl: '',
    UserName:'',
    UserWechatNumber:'',
    UserAddress:'',
    UserPhoneNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toChange: function(e)
  {
    wx.navigateTo({
      url: '/pages/changeInformation/changeInformation',
    })
  },
  onLoad(options) {
    this.setData(
      {
        AvatarUrl: app.globalData.AvatarUrl,
        UserName:app.globalData.UserName,
        UserWechatNumber:app.globalData.UserWechatNumber,
        UserAddress:app.globalData.UserAddress,
        UserPhoneNumber:app.globalData.UserPhoneNumber
      })
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
    this.setData(
      {
        AvatarUrl: app.globalData.AvatarUrl,
        UserName:app.globalData.UserName,
        UserWechatNumber:app.globalData.UserWechatNumber,
        UserAddress:app.globalData.UserAddress,
        UserPhoneNumber:app.globalData.UserPhoneNumber
      })
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