// 假设是在 page.js 中
const db = wx.cloud.database();

Page({
  data: {
    thumbs: [] // 用于存储从数据库获取的thumbs记录
  },

  onLoad: function() {
    this.fetchThumbs();
  },

  fetchThumbs: function() {
    db.collection('thumbs').get().then(res => {
      this.setData({
        thumbs: res.data
      });
    }).catch(err => {
      console.error("获取thumbs失败", err);
    });
  }
});
