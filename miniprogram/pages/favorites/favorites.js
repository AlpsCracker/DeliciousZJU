// 假设是在 page.js 中
const db = wx.cloud.database();

Page({
  data: {
    likes: [] // 用于存储从数据库获取的likes记录
  },

  onLoad: function() {
    this.fetchLikes();
  },

  fetchLikes: function() {
    db.collection('likes').get().then(res => {
      this.setData({
        likes: res.data
      });
    }).catch(err => {
      console.error("获取likes失败", err);
    });
  }
});
