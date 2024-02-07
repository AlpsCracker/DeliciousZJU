// components/takeawayRequest/takeawayRequest.js
const db = wx.cloud.database();
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    sid: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tag: '',
    DishImage: '',
    dishName: '',
    canteenName: '',
    UserName: '',
    UserAddress: '',
    expectedTime: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function (e) {
      wx.navigateTo({
        url: `/pages/takeawayDetails/takeawayDetails?sid=${this.properties.sid}`,
      })
    },
    fetchData: function () {
      // 首先从takeaways集合中获取记录
      db.collection('takeaways').doc(this.properties.sid).get().then(res => {
        const takeaway = res.data;
        // 更新组件数据
        this.setData({
          UserAddress: takeaway.UserAddress,
          UserName: takeaway.UserName,
          tag: takeaway.tag,
          expectedTime: takeaway.expectedTime
        });

        // 然后使用takeaway的tag从dish集合中获取记录
        return db.collection('dishes').where({
          tag: takeaway.tag // 这里假设tag是唯一的
        }).get();
      }).then(res => {
        if (res.data.length > 0) {
          const dish = res.data[0]; // 假设每个tag对应一个唯一的dish
          // 更新组件数据
          this.setData({
            canteenName: dish.canteen,
            dishName: dish.name,
            DishImage: dish.image
          });
        }
      }).catch(err => {
        console.error("获取数据失败", err);
      });
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时调用
      console.log("sid is"+this.properties.sid)
      this.fetchData();
    }
  }
})