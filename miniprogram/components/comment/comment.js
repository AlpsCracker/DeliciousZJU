// components/comment/comment.js
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
    ThumbColor: "#89909f",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ChangeThumb: function (e) {
      if (this.data.ThumbColor == "#89909f") {
        this.setData({
          ThumbColor: "red",
        });
      } else {
        this.setData({
          ThumbColor: "#89909f",
        });
      }
    }
  }
})