// pages/takeawayDetails/takeawayDetails.js
const db = wx.cloud.database();
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    tag:'',
    UserName: '',
    UserWechatNumber: '',
    UserAddress: '',
    UserPhoneNumber: '',
    dishNumber:1,
    notes:'',
    expectedTime:'',
    active:true,
    receiver:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      sid: options.sid
    })
    console.log('Received sid:', this.data.sid);
    this.fetchTakeawayDetails();
  },
  fetchTakeawayDetails: function() {
    const that = this;
    db.collection('takeaways').doc(this.data.sid).get().then(res => {
      const record = res.data;
      that.setData({
        // 直接使用数据库记录更新data
        tag: record.tag,
        UserName: record.UserName,
        UserWechatNumber: record.UserWechatNumber,
        UserAddress: record.UserAddress,
        UserPhoneNumber: record.UserPhoneNumber,
        dishNumber: record.dishNumber,
        notes: record.notes,
        expectedTime: record.expectedTime,
        active: record.active,
        receiver: record.receiver
      });
    }).catch(err => {
      console.error("获取takeaway记录失败", err);
    });
  },
  updateTakeaway: function() {
    const that = this;
    const openid = app.globalData.openid; // 从全局数据中获取当前用户的openid

    // 确保在获取到openid后再执行更新操作
    if (openid) {
      db.collection('takeaways').doc(that.data.sid).update({
        data: {
          active: false, // 将active设置为false
          receiver: openid // 将receiver设置为当前用户的openid
        }
      }).then(res => {
        console.log('更新成功', res);
        Toast.success("接单成功,请您主动联系客人")
        // 这里可以添加一些更新成功后的逻辑，例如提示用户更新成功、页面跳转等
      }).catch(err => {
        console.error('更新失败', err);
        // 这里可以处理更新失败的逻辑，例如提示用户更新失败
      });
    } else {
      console.error('无法获取用户OpenID');
      // 处理无法获取OpenID的情况
    }
  },
  fetchOrder: function(e)
  {
    this.updateTakeaway()
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