Component({
  properties: {
    uid: {
      type: String,
      value: ""
    }
  },
  data: {
    tag: '',
    dishName: '',
    canteenName: '',
    content: '',
    isReplied: false,
    isRepliedDisplay: '未处理',
    replyContent: ''
  },
  methods: {
    fetchFeedbackAndDishInfo: function() {
      const db = wx.cloud.database();
      const feedbackCollection = db.collection('feedback');
      const dishesCollection = db.collection('dishes');

      // 根据 uid 查询 feedback 集合
      feedbackCollection.where({
        _id: this.properties.uid // 使用组件传入的 uid 进行查询
      }).get().then(res => {
        if (res.data.length > 0) {
          const feedback = res.data[0];
          // 更新组件 data 中的 feedback 信息
          this.setData({
            tag: feedback.tag,
            content: feedback.content,
            isReplied: feedback.isReplied,
            replyContent: feedback.replyContent,
            isRepliedDisplay: feedback.isReplied ? '已回复' : '未回复'
          });

          // 根据 tag 查询 dishes 集合
          dishesCollection.where({
            tag: feedback.tag
          }).get().then(dishRes => {
            if (dishRes.data.length > 0) {
              const dish = dishRes.data[0];
              // 更新组件 data 中的 dish 信息
              this.setData({
                dishName: dish.name,
                canteenName: dish.canteen
              });
            }
          }).catch(err => {
            console.error('查询 dishes 集合失败', err);
          });
        }
      }).catch(err => {
        console.error('查询 feedback 集合失败', err);
      });
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.fetchFeedbackAndDishInfo();
    }
  }
});
