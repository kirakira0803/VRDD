const axios = require('axios');

module.exports = {
  check: async (event) => {
    // 1. 获取参数（前端传递的 content）
    const { content } = event.data;

    // 2. 获取 AccessToken（带缓存）
    let accessToken = await cache.get('access_token');
    if (!accessToken) {
      const tokenRes = await axios.get(
        `https://api.weixin.qq.com/cgi-bin/token`,
        {
          params: {
            grant_type: 'client_credential',
            appid: process.env.WX_APPID, // 从云环境变量读取
            secret: process.env.WX_APPSECRET
          }
        }
      );
      accessToken = tokenRes.data.access_token;
      await cache.set('access_token', accessToken, 7000); // 缓存 7000 秒（微信有效期 7200 秒）
    }

    // 3. 调用微信安全接口
    const checkRes = await axios.post(
      `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`,
      { content }
    );

    // 4. 返回结果给前端
    return checkRes.data;
  }
}