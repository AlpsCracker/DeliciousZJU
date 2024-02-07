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
    console.log(this.data)
    this.updateOrCreateUser()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  updateOrCreateUser: function () {
    const db = wx.cloud.database();
    const userCollection = db.collection('user');
    // 获取用户的 openid，需要确保在 app.js 中已经调用过 wx.cloud.init
    const openid = app.globalData.openid; // 假设你已经在登录时将用户的 openid 保存到全局变量中
    const {
      AvatarUrl,
      UserName,
      UserWechatNumber,
      UserAddress,
      UserPhoneNumber
    } = this.data;

    // 检查用户是否存在
    userCollection.where({
      _openid: openid
    }).get().then(res => {
      if (res.data.length > 0) {
        // 用户已存在，更新数据
        userCollection.where({
          _openid: openid
        }).update({
          data: {
            AvatarUrl,
            UserName,
            UserWechatNumber,
            UserAddress,
            UserPhoneNumber
          }
        }).then(() => {
          Toast.success('信息更新成功,重新进入小程序后生效!');
        }).catch(err => {
          console.error('更新失败', err);
        });
      } else {
        // 用户不存在，创建新记录
        userCollection.add({
          data: {
            _openid: openid, // 注意：直接在小程序端操作数据库时，可能不需要手动设置 _openid，因为它会自动添加
            AvatarUrl,
            UserName,
            UserWechatNumber,
            UserAddress,
            UserPhoneNumber
          }
        }).then(() => {
          Toast.success('用户创建成功,重新进入小程序后生效!');
        }).catch(err => {
          console.error('创建失败', err);
        });
      }
    }).catch(err => {
      console.error('查询失败', err);
    });
  },
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