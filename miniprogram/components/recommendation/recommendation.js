// components/Recommendation/recommendation.js
const db = wx.cloud.database()
Component({
  properties: {
    tag: {
      type: String,
      value: ""
    },
  },

  data: {
    imageUrl: '',
    dishName: '',
    canteenName: '',
    score: 0,
    scoreNumber: 0,
    rateValue: 0,
    totalScore: 0,
  },

  methods: {
    toDetail: function (e) {

      wx.navigateTo({
        url: `/pages/itemDetails/itemDetails?tag=${this.properties.tag}`,
      });
      console.log('Yes!!!');
      console.log(this.properties.tag)
    },
    fetchData() {
      const mydish = db.collection('dishes')
      db.collection('dishes').where({
        tag: this.properties.tag
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
            console.log('未找到对应的菜品');
          }
        },
        fail: err => {
          console.error('查询失败', err);
        }
      });
    }
  },
  lifetimes: {
    attached() {
      this.fetchData();
      console.log(this.properties.tag)
    },
  }
})