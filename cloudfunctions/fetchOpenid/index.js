// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

exports.main = async (event, context) => {
  // 获取微信用户的 openid
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID,
  }
}