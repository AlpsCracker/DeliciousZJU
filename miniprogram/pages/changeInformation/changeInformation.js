// pages/changeInformation/changeInformation.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AvatarUrl: '',
    UserName: '',
    UserWechatNumber: '',
    UserAddress: '',
    UserPhoneNumber: ''
  },
  onChangeUserName: function (event) {
    this.setData({
      UserName: event.detail
    });
  },

  onChangeUserAddress: function (event) {
    this.setData({
      UserAddress: event.detail
    });
  },

  onChangeUserWechatNumber: function (event) {
    this.setData({
      UserWechatNumber: event.detail
    });
  },

  onChangeUserPhoneNumber: function (event) {
    this.setData({
      UserPhoneNumber: event.detail
    });
  },
  onChooseAvatar: function (event) {
    this.setData({
      AvatarUrl: event.detail
    });
  },
  toSave: function (e) {
    wx.cloud.callFunction({
      name: 'updateOrCreateUser',
      data: {
        AvatarUrl: this.data.AvatarUrl,
        UserName: this.data.UserName,
        UserWechatNumber: this.data.UserWechatNumber,
        UserAddress: this.data.UserAddress,
        UserPhoneNumber: this.data.UserPhoneNumber
      },
      success: function (res) {
        console.log(res.result.message);
        Toast.success('保存成功');
        app.globalData.AvatarUrl = this.data.AvatarUrl;
        app.globalData.UserName = this.data.UserName;
        app.globalData.UserWechatNumber = this.data.UserWechatNumber;
        app.globalData.UserAddress = this.data.UserAddress;
        app.globalData.UserPhoneNumber = this.data.UserPhoneNumber;
        // 设置延迟两秒后执行页面跳转
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/information/information',
          });
        }, 1200); // 2000 毫秒等于两秒
      },
      fail: function (err) {
        console.error(err);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      AvatarUrl: app.globalData.AvatarUrl,
      UserName: app.globalData.UserName,
      UserWechatNumber: app.globalData.UserWechatNumber,
      UserAddress: app.globalData.UserAddress,
      UserPhoneNumber: app.globalData.UserPhoneNumber
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