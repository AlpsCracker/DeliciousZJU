// components/writeComment/writeComment.js
import Toast from '@vant/weapp/toast/toast';
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function(event)
    {
      Toast.success('评分成功');
    },
  }
})