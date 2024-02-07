Page({
  data: {
    tags: [], // 用于存储所有标签的数组
    searchItem:''
  },

  onLoad: function(options) {
    // 假设从跳转链接获取的参数名是 searchItem
    const searchItem = options.searchItem || ''; // 如果options中没有searchItem，默认为空字符串
    console.log("This is " + searchItem);
    this.setData({
      searchItem: searchItem // 更新页面data中的searchItem
    });
    this.searchDishes(searchItem); // 使用获取的searchItem进行搜索
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
