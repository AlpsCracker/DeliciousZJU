import Toast from '@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp()
Component({
  properties: {
    tag: {
      type: String,
      value: ''
    }
  },
  data: {
    rateValue: 0,
    differ: 0,
    content: '',
    AvatarUrl: '',
    UserName: '',
  },
  methods: {
    onChangeComment: function (event) {
      console.log(event.detail)
      this.setData({
        content: event.detail
      })
    },
    submitComment: function (event) {
      console.log("submitComments")
      db.collection('comments').add({
        data: {
          tag: this.properties.tag,
          content: this.data.content,
          rateValue: this.data.rateValue,
          AvatarUrl: this.data.AvatarUrl,
          UserName: this.data.UserName,
          thumbNumber:0
        }
      }).then(() => {
        Toast.success("提交评论成功!")
      }).catch(console.error);
    },
    onChangeRate: function (event) {
      console.log("onRateChange")
      const newRateValue = event.detail;
      const differ = newRateValue - this.data.rateValue;
      this.setData({
        differ: differ,
        rateValue: newRateValue,
      });

      // 移除之前的评分记录，然后提交新评分
      this.removeRating().then(() => {
        this.submitRating();
      }).catch(console.error);
    },
    removeRating: function () {
      console.log("removingRating")
      return new Promise((resolve, reject) => {
        db.collection('ratings').where({
          tag: this.properties.tag
        }).remove().then(() => {
          console.log("Remove success");
          resolve();
        }).catch(error => {
          console.error(error);
          reject(error);
        });
      });
    },
    submitRating: function () {
      // 提交新的评分记录
      console.log("submitratings")
      db.collection('ratings').add({
        data: {
          tag: this.properties.tag,
          value: this.data.rateValue,
          differ: this.data.differ
        }
      }).then(() => {
        Toast.success('评分成功');
        this.handleRatingChange();
      }).catch(console.error);
    },
    handleRatingChange: function () {
      console.log("handleratingchange")
      // 根据评分差异选择添加或更新操作
      const action = this.data.differ === this.data.rateValue ? 'addRating' : 'updateRating';
      const ratingData = {
        tag: this.properties.tag,
        value: this.data.rateValue,
        differ: this.data.differ
      };

      // 新增评分或更新评分
      if (action === 'addRating') {
        this.addRating(ratingData);
      } else {
        this.updateRating(ratingData);
      }
    },
    addRating: function (ratingData) {

      // 查找匹配的tag并更新菜肴记录
      db.collection('dishes').where({
        tag: ratingData.tag
      }).get().then(res => {
        if (res.data.length > 0) {
          const dish = res.data[0];
          db.collection('dishes').doc(dish._id).update({
            data: {
              scorePeople: db.command.inc(1),
              totalScore: db.command.inc(ratingData.value)
            }
          }).then(() => console.log('评分添加成功')).catch(console.error);
        }
      }).catch(console.error);
    },
    updateRating: function (ratingData) {
      console.log("updaterating")
      // 查找匹配的tag并更新总评分
      db.collection('dishes').where({
        tag: ratingData.tag
      }).get().then(res => {
        if (res.data.length > 0) {
          const dish = res.data[0];
          db.collection('dishes').doc(dish._id).update({
            data: {
              totalScore: db.command.inc(ratingData.differ)
            }
          }).then(() => console.log('评分修改成功')).catch(console.error);
        }
      }).catch(console.error);
    },
    queryRatings: function () {
      // 查询当前标签的评分记录
      console.log(this.properties.tag)
      db.collection('ratings').where({
        tag: this.properties.tag
      }).get().then(res => {
        console.log(res)
        console.log(this.properties.tag)
        if (res.data.length > 0) {
          const value = res.data[0].value;
          this.setData({
            rateValue: value
          });
        }
      }).catch(console.error);
    }
  },
  lifetimes: {
    ready() {
      // 组件准备好后查询评分
      this.queryRatings();
      console.log("querying")
      this.setData({
        AvatarUrl: app.globalData.AvatarUrl,
        UserName: app.globalData.UserName
      })
    }
  }
});