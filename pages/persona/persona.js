// pages/persona/persona.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide1: false,
    hide2: true,
    hide3: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo,
    //     })
    //   }
    // })
    var artistid = wx.getStorageSync('artistId');
    if (artistid == 0) {
      this.setData({ hide1: false, hide3:true});
    }
     else {
      this.setData({ hide1: true, hide2: false })
    }
  },
  gostuffTap: function (event) {
    wx.navigateTo({
      url: "/pages/stuff/stuff"
    })
  },
  gocardTap: function (event) {
    wx.navigateTo({
      url: "/pages/card/card"
    })
  },
// 我的名片
  // gocardTap: function (event) {
  //   wx.navigateTo({
  //     url: "/pages/card/card"
  //   })
  // },
  // // 作品管理
  // gocardTap: function (event) {
  //   wx.navigateTo({
  //     url: "/pages/card/card"
  //   })
  // },
  // 姓名
  gonameTap: function (event) {
    wx.navigateTo({
      url: "/pages/name/name"
    })
  },
  // 手机
  goverificationTap: function (event) {
    wx.navigateTo({
      url: "/pages/verification/verification"
    })
  },
  // 被喜欢
  golikemeTap: function (event) {
    wx.navigateTo({
      url: "/pages/likeme/likeme"
    })
  },
  // 被评论
  gocomtmeTap: function (event) {
    wx.navigateTo({
      url: "/pages/comtme/comtme"
    })
  },
  // 去评论
  gomycomtTap: function (event) {
    wx.navigateTo({
      url: "/pages/mycomt/mycomt"
    })
  },
  // 我喜欢的作品
  goarticleTap: function (event) {
    wx.navigateTo({
      url: "/pages/article/article"
    })
  },
  // 我喜欢的艺术家
  gofiguresTap: function (event) {
    wx.navigateTo({
      url: "/pages/figures/figures"
    })
  },
  // 提醒
  goremindTap: function (event) {
    wx.navigateTo({
      url: "/pages/remind/remind"
    })
  },
  // 意见
  gofeedbackTap: function (event) {
    wx.navigateTo({
      url: "/pages/feedback/feedback"
    })
  },
  // 我们
  gousTap: function (event) {
    wx.navigateTo({
      url: "/pages/us/us"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var artistid = wx.getStorageSync('artistId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid,
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("stuff页1", res.data);
        this.setData({
          userInfo: res.data.artist
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})