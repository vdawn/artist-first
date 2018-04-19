// pages/index/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hide: false,
    artistid: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取艺术家们
   */
  getdata: function () {
    var that = this;
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist',
      data: {
        page: 1,
        limit: 3
      },
      method: "GET",
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      success: res => {
        // console.log("index页", res.data);
        that.setData({
          list: res.data.page.list
        })
      },
    })
  },
  // 点击关闭创建名片入口
  close: function () {
    this.setData({ hide: true })
  },
  gocardTap: function (event) {
    wx.navigateTo({
      url: "/pages/card/card"
    })
  },
  gohomepageTap: function (event) {
    var artistid = wx.getStorageSync('artistId');
    // 具体对应其他艺术家的id
    var artistsid = event.currentTarget.dataset.artistid;
    // 判断是主人还是其他艺术家
    if (artistid == artistsid) {
      wx.navigateTo({
        url: "/pages/stuff/stuff"
      })
    } else {
      wx.navigateTo({
        url: "/pages/homepage/homepage?id=" + artistsid
      })
    }

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
    app.test();
  
    var artistid = wx.getStorageSync('artistId');
    // if (artistid == 0) {
    //   this.setData({ hide: false })
    // } else {
    //   this.setData({ hide: true })
    // }
    this.getdata();
    console.log("index页", artistid)
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