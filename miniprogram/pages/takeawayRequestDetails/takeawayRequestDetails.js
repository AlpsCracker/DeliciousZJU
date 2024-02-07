// pages/takeawayRequestDetails/takeawayRequestDetails.js
const app = getApp()
const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:'',
    UserName: '',
    UserWechatNumber: '',
    UserAddress: '',
    UserPhoneNumber: '',
    dishNumber:1,
    notes:'',
    expectedTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.tag) {
      this.setData({
        tag: options.tag // 将页面的 tag 设置为 URL 参数中的值
      })
    };
    console.log('This is tag')
    console.log(this.data.tag)
    this.setData({
      UserName: app.globalData.UserName,
      UserWechatNumber: app.globalData.UserWechatNumber,
      UserAddress: app.globalData.UserAddress,
      UserPhoneNumber: app.globalData.UserPhoneNumber,
    })
  },
  onChange1(event)
  {
    console.log(event.detail)
    this.setData({
      dishNumber:event.detail
    })
  },
  onChange2(event)
  {
    console.log(event.detail)
    this.setData({
      notes:event.detail
    })
  },
  onChange3(event)
  {
    console.log(event.detail)
    this.setData({
      expectedTime:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  sendRequest: function(e)
  {
    db.collection('takeaways').add({
      data: {
        tag: this.data.tag,
        UserName: this.data.UserName,
        UserWechatNumber: this.data.UserWechatNumber,
        UserAddress: this.data.UserAddress,
        UserPhoneNumber: this.data.UserPhoneNumber,
        dishNumber: this.data.dishNumber,
        notes: this.data.notes,
        expectedTime: this.data.expectedTime,
        active:true,
        receiver:''
      }
    }).then(res => {
      console.log('订单提交成功', res);
      Toast.success({message: '提交成功', context: this});

      // 处理提交成功的逻辑，比如提示用户、清空表单等
    }).catch(err => {
      console.error('订单提交失败', err);
      // 处理错误情况
      Toast({message: '提交失败', context: this});
    });
  },
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