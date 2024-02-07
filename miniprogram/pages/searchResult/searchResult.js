Page({
  data: {
    tags: [], // 用于存储所有标签的数组
    searchItem:''
  },

  onLoad: function(options) {
    this.searchDishes(this.data.searchItem); // 假设'searchItem'是您要搜索的关键词
  },

  // 搜索dishes集合中包含searchItem的记录
  searchDishes: function(searchItem) {
    console.log(searchItem)
    const db = wx.cloud.database();
    db.collection('dishes').where({
      name: db.RegExp({
        regexp: searchItem,
        options: 'i', // 不区分大小写
      })
    }).get({
      success: res => {
        let tags = [];
        res.data.forEach(dish => {
          // 假设每个dish有一个tag字段
          if (dish.tag && !tags.includes(dish.tag)) {
            tags.push(dish.tag);
          }
        });
        this.setData({
          tags: tags
        });
        console.log(tags)
      },
      fail: err => {
        console.error('查询失败', err);
      }
    });
  },
})
