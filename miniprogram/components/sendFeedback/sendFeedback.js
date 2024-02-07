// components/sendFeedback/sendFeedback.js
import Toast from '@vant/weapp/toast/toast';
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function(event)
    {
      this.setData({
        content: event.detail
      })
      console.log(this.data)
    },
    send: function() {
      const db = wx.cloud.database(); // 获取数据库的引用
      const feedbackCollection = db.collection('feedback'); // 获取到名为 feedback 的集合的引用
      
      // 使用 properties 和 data 中的值创建新记录
      feedbackCollection.add({
        data: {
          tag: this.properties.tag, // 假设这是外部传入的标签
          content: this.data.content, // 假设这是内部数据，这里可能是 this.data.content?
          isReplied: false,
          replyContent: '' // 初始为空字符串
        },
        success: function(res) {
          // 创建记录成功后的处理
          Toast.success("反馈提交成功")
        },
        fail: console.error
      });
    },
  }
})