// 引入微信服务器SDK
const cloud = require('wx-server-sdk');

// 初始化云环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
});

// 获取数据库的引用
const db = cloud.database();

// 云函数的主函数
exports.main = async (event, context) => {
  // 从事件对象中解构出操作类型和评分数据
  const { action, ratingData } = event;
  console.log("This is the main cloud function")

  // 处理新增评分的情况
  if (action === 'addRating') {

    // 提取tag和评分值
    const tag = ratingData.tag;
    const value = ratingData.value;

    // 在dishes集合中查找匹配的tag
    const dishesQuery = await db.collection('dishes').where({ tag }).get();

    // 如果找到匹配的菜肴
    if (dishesQuery.data.length > 0) {
      const dish = dishesQuery.data[0];

      // 更新找到的菜肴记录，增加评分人数和总评分
      await db.collection('dishes').doc(dish._id).update({
        data: {
          scorePeople: db.command.inc(1), // 将scorePeople字段增加1
          totalScore: db.command.inc(value) // 将totalScore字段增加value
        }
      });
    }
  }
  // 处理评分变化的情况
  else if (action === 'updateRating') {
    console.log(ratingData)
    const tag = ratingData.tag;
    const differ = ratingData.differ;

    const dishesQuery = await db.collection('dishes').where({ tag }).get();

    if (dishesQuery.data.length > 0) {
      const dish = dishesQuery.data[0];
      console.log("Found")
      console.log(dish)
      // 更新菜肴记录的总评分
      await db.collection('dishes').doc(dish._id).update({
        data: {
          totalScore: db.command.inc(differ) // 将totalScore字段增加differ
        }
      });
      console.log("Changed")
      console.log(dish)
    }
  }

  // 返回操作成功的信息
  return { success: true };
};
