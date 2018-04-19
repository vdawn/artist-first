// pages/homepage/homepage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    homedetails: [],
    works: [],
    show: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var artistsid = options.id;
    var that = this;
    var artistid = wx.getStorageSync('artistId');
    // 第一次应该是0,走完封面更换
    // console.log('---------------------', artistid)
    // console.log(artistsid, "等于？", artistid)
    if (artistid == 0) {
      this.setData({ hide: false})
    }else{
      this.setData({ show: false })
    }
    var token = wx.getStorageSync('token');
    // console.log(token)
        wx.request({
          url: 'https://yishujia.yicuichina.com/api/artist/' + artistsid,
          data: {
            token: token
          },
          method: "GET",
          header: { 'Content-Type': 'application/json' },
          dataType: "json",
          success: res => {
            console.log("homepage页1", res.data);
            that.setData({
              homedetails: res.data.artist
            })
          },
        });
        wx.request({
          url: 'https://yishujia.yicuichina.com/api/artist/' + artistsid + '/works',
          data: {
            token: token,
            page: 1,
            limit: 5
          },
          method: "GET",
          header: { 'Content-Type': 'application/json' },
          dataType: "json",
          success: res => {
            // console.log("homepage页2", res.data)
            that.setData({
              works: res.data.page.list
            })
          },
        })
  },
  goreleaseTap: function (e) {
    wx.navigateTo({
      url: "/pages/release/release"
    })
  },
  close: function () {
    this.setData({ show: true })
  },
  gointroduceTap: function (e) {
    var intro = e.currentTarget.dataset.intro;
    wx.navigateTo({
       url: "/pages/introduce/introduce?intro=" + intro
    })
  },
  gocollectionTap: function (e) {
    var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/collection/collection?id=" + artistid
    })
  },
  goprizesTap: function (e) {
    var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/prizes/prizes?id=" + artistid
    })
  },
  gocommentTap: function (e) {
    var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/comment/comment?id=" + artistid
    })
  },
  gomienTap: function (e) {
    var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/mien/mien?id=" + artistid
    })
  },
  godetailsTap: function (event) {
    var worksid = event.currentTarget.dataset.worksid;
    wx.navigateTo({
      url: "/pages/details/details?id=" + worksid
    })
  },
  gocardTap: function (event) {
    wx.navigateTo({
      url: "/pages/card/card"
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