// pages/itemDetails/itemDetails.js
import Toast from '@vant/weapp/toast/toast';
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: '',
    likeState: false,
    likeColor: "#C0C0C0",
    show: false,
    imageUrl: '',
    dishName: '',
    canteenName: '',
    score: 0,
    scoreNumber: 0,
    rateValue: 0,
    totalScore: 0
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  fetchData() {
    const mydish = db.collection('dishes')
    db.collection('dishes').where({
      tag: this.data.tag
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const dish = res.data[0];
          const score = dish.totalScore / dish.scorePeople;
          this.setData({
            imageUrl: dish.image,
            dishName: dish.name,
            totalScore: dish.totalScore,
            canteenName: dish.canteen,
            scoreNumber: dish.scorePeople,
            score: score.toFixed(1),
            rateValue: Math.round(score)
          });
        } else {
          console.log(this.data.tag)
          console.log('未找到对应的菜品');
        }
      },
      fail: err => {
        console.error('查询失败', err);
      }
    });
  },
  changeLike: function (e) {
    if (this.data.likeState == false) {
      this.setData({
        likeState: true,
        likeColor: "red",
      });
      Toast.success('喜欢成功');
    } else {
      this.setData({
        likeState: false,
        likeColor: "#C0C0C0",
      });
      Toast.success('取消喜欢成功');
    }
  },
  toDetail: function (e) {
    this.showPopup();
  },
  onChange: function (event) {
    Toast.success('评分成功');
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
    this.fetchData()
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