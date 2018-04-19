wx.login({
  success: res => {
    var code = res.code;
    if (code) {
      console.log('获取用户登录凭证：' + code);
      // --------- 发送凭证 ------------------
      wx.request({
        url: 'https://yishujia.yicuichina.com/api/auth/wechat',
        data: { code: code },
        method: "POST",
        header: { 'Content-Type': 'application/json' },
        success: res => {
          // this.setData({
          //   artistID: artistID
          // })

          // console.log(res.data.data)
          this.globalData.artistID = res.data.data.user.artistId
          // console.log(this.globalData.artistID);
        }
      })
    } else {
      // console.log('获取用户登录态失败：' + res.errMsg);
    }
  }
});