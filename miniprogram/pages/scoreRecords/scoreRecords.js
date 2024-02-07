const db = wx.cloud.database();
const app = getApp()
Page({
  data: {
    comments: [], // 存储当前用户的评论记录
    openid: app.globalData.openid // 当前用户的openid
  },

  onLoad: function() {
    this.fetchOpenidAndComments();
  },

  fetchOpenidAndComments: function() {
    // 假设 getOpenid 是一个调用云函数获取当前用户 openid 的方法
      this.setData({ openid: app.globalData.openid });
      this.fetchComments(this.data.openid);
  },

  fetchComments: function(openid) {
    db.collection('comments').where({
      _openid: openid // 使用当前用户的openid查询
    }).get().then(res => {
      this.setData({
        comments: res.data
      });
    }).catch(err => {
      console.error("获取评论失败", err);
    });
  }
});
