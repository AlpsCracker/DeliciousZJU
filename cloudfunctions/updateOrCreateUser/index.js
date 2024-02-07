// 云函数入口文件
// 云函数 updateOrCreateUser/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: 'music-cloud-0gsnkc8jabc91db2'
});

const db = cloud.database();

exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext();
  const userCollection = db.collection('user');
  const { OPENID } = wxContext;
  const {
    AvatarUrl,
    UserName,
    UserWechatNumber,
    UserAddress,
    UserPhoneNumber
  } = event;

  // 检查用户是否存在
  const userResult = await userCollection.where({
    _openid: OPENID
  }).get();

  // 用户已存在，更新数据
  if (userResult.data.length > 0) {
    await userCollection.where({
      _openid: OPENID
    }).update({
      data: {
        AvatarUrl,
        UserName,
        UserWechatNumber,
        UserAddress,
        UserPhoneNumber
      }
    });
     return await{ message: '用户信息更新成功' };
  } 
  // 用户不存在，创建新记录
  else {
    await userCollection.add({
      data: {
        _openid: OPENID,
        AvatarUrl,
        UserName,
        UserWechatNumber,
        UserAddress,
        UserPhoneNumber
      }
    });
    return await{ message: '新用户创建成功' };
  }
};
