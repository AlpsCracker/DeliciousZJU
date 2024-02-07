App({
  globalData: {
    AvatarUrl: '',
    UserName: '',
    UserWechatNumber: '',
    UserAddress: '',
    UserPhoneNumber: '',
    openid: ''
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用2.2.3或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: 'music-cloud-0gsnkc8jabc91db2',
        traceUser: true,
      });
      console.log("云服务设置完成");

      // 获取并设置openid
      wx.cloud.callFunction({
        name: 'fetchOpenid',
        success: res => {
          console.log('用户的openid: ', res.result.openid);
          this.globalData.openid = res.result.openid;
          this.fetchUserDataAndUpdateGlobalData();
        },
        fail: console.error
      });
    }
  },

  fetchUserDataAndUpdateGlobalData: function() {
    const db = wx.cloud.database();
    const userCollection = db.collection('user');

    userCollection.where({
      _openid: this.globalData.openid
    }).get().then(res => {
      if (res.data.length > 0) {
        let userData = res.data[0];
        this.globalData.AvatarUrl = userData.AvatarUrl || '';
        this.globalData.UserName = userData.UserName || '';
        this.globalData.UserWechatNumber = userData.UserWechatNumber || '';
        this.globalData.UserAddress = userData.UserAddress || '';
        this.globalData.UserPhoneNumber = userData.UserPhoneNumber || '';
      } else {
        console.log('未找到用户数据');
      }
    }).catch(err => {
      console.error('获取用户数据失败', err);
    });
  }
});
