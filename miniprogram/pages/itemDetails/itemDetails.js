// pages/itemDetails/itemDetails.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeState: false,
    likeColor: "#C0C0C0",
    show: false,
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  changeLike: function(e) {
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
  toDetail: function(e)
  {
    this.showPopup();
  },
  onChange: function(event)
  {
    Toast.success('评分成功');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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