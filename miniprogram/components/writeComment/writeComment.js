// components/writeComment/writeComment.js
import Toast from '@vant/weapp/toast/toast';
const db = wx.cloud.database()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rateValue: 0,
    differ: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeRate: function (event) {
      this.setData({
        differ: event.detail - this.data.rateValue,
        rateValue: event.detail,
      });
      this.removeRating(this.submitRating); // 传递submitRating作为回调
    },
    removeRating: function (callback) {
      const that = this;
      db.collection('ratings').where({
        tag: that.properties.tag
      }).remove({
        success: function (res) {
          console.log("Remove success");
          callback.call(that); // 调用submitRating
        },
        fail: console.error
      });
    },

    submitRating: function () {
      db.collection('ratings').add({
        data: {
          tag: this.properties.tag,
          value: this.data.rateValue,
          differ: this.data.differ
        },
        success: function (res) {
          Toast.success('评分成功');
          console.log("Differ is" + this.data.differ)
          console.log("Submit done.");
        },
        fail: console.error
      });
      let messager = {
        tag: this.properties.tag,
        value: this.data.rateValue,
        differ: this.data.differ
      };
      if (this.data.rateValue == this.data.differ) {
        wx.cloud.callFunction({
          name: 'handleRatings', // 替换为您的云函数名称
          data: {
            action: 'addRating',
            ratingData: messager
          },
          success: function (res) {
            console.log('评分添加成功', res);
          },
          fail: function (err) {
            console.error('评分添加失败', err);
          }
        });
      } else {
        wx.cloud.callFunction({
          name: 'handleRatings', // 替换为您的云函数名称
          data: {
            action: 'updateRating',
            ratingData: messager
          },
          success: function (res) {
            console.log('评分修改成功', res);
          },
          fail: function (err) {
            console.error('评分修改失败', err);
          }
        });
      }
    },

    queryRatings: function () {
      const that = this; // 保存组件的this引用
      db.collection('ratings').where({
        tag: this.properties.tag
      }).get({
        success: function (res) {
          if (res.data.length > 0) {
            const value = res.data[0].value; // 假设取第一条记录
            that.setData({
              rateValue: value
            });
            console.log("The value is " + value); // 现在这里会打印正确的值
          }
        },
        fail: console.error
      });
    }
  },

  lifetimes: {
    ready() {
      this.queryRatings();
    },
  }
});