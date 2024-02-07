// pages/takeaway/takeaway.js
const db = wx.cloud.database();
const canteens = ["玉湖餐厅", "澄月餐厅", "银泉餐厅", "东区大食堂", "麦香餐厅", "麦斯威餐厅", "临湖餐厅"];
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active : 0,
    activeKey: 0,
    tagsInTotal: [],
    activeTags: []
  },
  onChange(event) {
  },
  onChange2: function (event) {
    this.setData({
      activeTags: [],
    });
    this.setData({
      activeKey: event.detail,
      activeTags: this.data.tagsInTotal[event.detail] || [],
    });
    console.log(this.data.activeKey);
    console.log(this.data.activeTags);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  fetchData: async function () {
    console.log("Fetching data");
    let newTagsInTotal = [];  // 创建一个局部变量来存储数据
  
    for (let i = 0; i < canteens.length; i++) {
      try {
        // 查询当前餐厅的数据
        const result = await db.collection('dishes').where({
          canteen: canteens[i]
        }).get();
        let mytags = []
        for (let j = 0; j < result.data.length; j++) {
          mytags.push(result.data[j].tag)
        }
        // 将查询结果存储在新的数组中
        newTagsInTotal.push(mytags);
      } catch (e) {
        console.error("Error fetching data for canteen:", canteens[i], e);
      }
    }
  
    // 使用setData更新页面数据
    this.setData({
      tagsInTotal: newTagsInTotal,
      activeTags: newTagsInTotal[0] || []
    });
    console.log(this.data.tagsInTotal)
  },
  onLoad(options) {
    this.fetchData();
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:2500,
      mask:true,
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