Component({
  data: {
    active: '0',
    list: [{
        icon: 'home-o',
        text: '主页',
        name: 'home',
        url: '/pages/index/index'
      },
      {
        icon: 'bag-o',
        text: '带饭',
        name: 'takeaway',
        url: '/pages/takeaway/takeaway'
      },  
      {
        icon: 'records-o',
        text: '评分',
        name: 'score',
        url: '/pages/score/score'
      },
      {
        icon: 'user-circle-o',
        text: '我的',
        name: 'me',
        url: '/pages/me/me'
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[event.detail].url,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
