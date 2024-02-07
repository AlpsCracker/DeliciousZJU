// pages/index/index.js
const db = wx.cloud.database(); // 获取数据库的引用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myId: "10001",
    searchItem:'',
    hotDishesTags: [],
    newDishesTags: []
  },
  onclick: function (e) {
    wx.navigateTo({
      url: '/pages/test/testpage',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSearch: function (event) {
    wx.navigateTo({
      url: `/pages/searchResult/searchResult?searchItem=${event.detail}`,
    });
  },
  getHotDishes: function () {

    db.collection('dishes').where({
      isHot: true // 筛选条件，isHot字段为true的记录
    }).get({
      success: res => {
        const tags1 = res.data.map(dish => dish.tag); // 提取所有热门菜品的tag
        this.setData({
          hotDishesTags: tags1 // 更新数据到页面
        });
      },
      fail: err => {
        console.error('获取热门菜品失败', err);
      }
    });
  },
  getNewDishes: function () {
    db.collection('dishes').where({
      isNew: true // 筛选条件，isHot字段为true的记录
    }).get({
      success: res => {
        const tags2 = res.data.map(dish => dish.tag); // 提取所有热门菜品的tag
        this.setData({
          newDishesTags: tags2 // 更新数据到页面
        });
      },
      fail: err => {
        console.error('获取新菜品失败', err);
      }
    });
  },
  onLoad(options) {
    this.getHotDishes();
    this.getNewDishes();
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
    this.getTabBar().init();
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