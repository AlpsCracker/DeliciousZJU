const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';

Component({
  properties: {
    uid: {
      type: String,
      value: ""
    }
  },
  data: {
    // 初始化数据
    tag: '',
    AvatarUrl: "",
    UserName: "AAA",
    rateValue: 0,
    content: "",
    isThumbed: false,
    thumbColor: '#89909f', // 默认颜色
    ThumbNumber: 0
  },
  methods: {
    ChangeThumb: function () {
      const isThumbedNow = !this.data.isThumbed;
      const thumbOperation = isThumbedNow ? db.collection('thumbs').add({
        data: {
          comment_id: this.properties.uid,
          isThumbed: true
        }
      }) : db.collection('thumbs').where({
        comment_id: this.properties.uid
      }).remove();

      const thumbNumberUpdateOperation = db.collection('comments').doc(this.properties.uid).update({
        data: {
          thumbNumber: db.command.inc(isThumbedNow ? 1 : -1),
        }
      });

      Promise.all([thumbOperation, thumbNumberUpdateOperation])
        .then(() => {
          const newThumbNumber = isThumbedNow ? this.data.ThumbNumber + 1 : this.data.ThumbNumber - 1;
          this.setData({
            isThumbed: isThumbedNow,
            ThumbNumber: newThumbNumber,
            thumbColor: isThumbedNow ? 'red' : '#89909f'
          });
          Toast.success(isThumbedNow ? "点赞成功!" : "取消点赞成功!");
        }).catch(error => {
          console.error(error);
          Toast.fail("操作失败");
        });
    },

    fetchInfo: function () {
      // 查询点赞状态
      db.collection('thumbs').where({
        comment_id: this.properties.uid
      }).get().then(res => {
        const isThumbed = res.data.length > 0;
        this.setData({
          isThumbed: isThumbed,
          thumbColor: isThumbed ? 'red' : '#89909f'
        });
      }).catch(console.error);

      // 查询评论信息
      db.collection('comments').where({
        _id: this.properties.uid
      }).get().then(res => {
        if (res.data.length > 0) {
          const commentItem = res.data[0];
          this.setData({
            content: commentItem.content,
            AvatarUrl: commentItem.AvatarUrl,
            UserName: commentItem.UserName,
            rateValue: commentItem.rateValue,
            ThumbNumber: commentItem.thumbNumber
          });
        }
      }).catch(console.error);
    }
  },
  lifetimes: {
    ready: function () {
      this.fetchInfo();
    }
  }
});