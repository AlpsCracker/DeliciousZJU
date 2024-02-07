// pages/takeawayRequestDetails/takeawayRequestDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:''
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