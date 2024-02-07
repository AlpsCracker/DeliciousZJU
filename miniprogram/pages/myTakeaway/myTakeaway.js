// pages/myTakeaway/myTakeaway.js
const app = getApp(); // 获取全局应用实例
const db = wx.cloud.database(); // 获取数据库引用

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTakeaways: [], // 存储_openid为当前用户的记录
    receivedTakeaways: [] // 存储receiver为当前用户的记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.fetchTakeaways();
  },

  fetchTakeaways: function() {
    const openid = app.globalData.openid;
    // 确保openid获取成功
    if (!openid) {
      console.error('无法获取用户OpenID');
      return;
    }
    
    // 获取用户创建的takeaways
    db.collection('takeaways').where({
      _openid: openid
    }).get().then(res => {
      this.setData({
        myTakeaways: res.data
      });
    }).catch(err => {
      console.error("获取用户创建的takeaways失败", err);
    });

    // 获取用户接收的takeaways
    db.collection('takeaways').where({
      receiver: openid
    }).get().then(res => {
      this.setData({
        receivedTakeaways: res.data
      });
    }).catch(err => {
      console.error("获取用户接收的takeaways失败", err);
    });
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