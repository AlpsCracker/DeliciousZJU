// pages/yourPage/yourPage.js
const app = getApp(); // 获取全局应用实例
const db = wx.cloud.database(); // 获取数据库的引用
const feedbackCollection = db.collection('feedback');
const openid = app.globalData.openid; // 假设你已经在登录时将用户的 openid 保存到全局变量中
Page({
  data: {
    feedbackList: [] // 用于存储查询到的反馈记录
  },
  onLoad: function() {
    console.log("This is my openid: " + app.globalData.openid);
    this.fetchUserFeedbacks();
  },
  fetchUserFeedbacks: function() {
    const openid = app.globalData.openid; // 在此处获取 openid，确保它已经被设置
    if (!openid) {
      console.error('OpenID is not available yet.');
      return;
    }

    // 根据 openid 查询用户自己创建的反馈记录
    wx.cloud.database().collection('feedback').where({
      _openid: openid
    }).get().then(res => {
      const feedbackIds = res.data.map(item => item._id);
      this.setData({
        feedbackList: feedbackIds
      });
      console.log(this.data.feedbackList); // 查看获取的反馈列表
    }).catch(err => {
      console.error('查询反馈记录失败', err);
    });
  }
});

