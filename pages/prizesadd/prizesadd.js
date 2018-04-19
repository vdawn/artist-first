// pages/prizesadd/prizesadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizes:"",
    worksid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  goreleaseTap: function (e) {
    wx.navigateTo({
      url: "/pages/release/release"
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
    var that = this;
    wx.getStorage({
      key: 'worksid',
      success: function (res) {
        that.setData({
          worksid: res.data
        })
      }
    })
    var worksid = this.data.worksid;
    var artistid = wx.getStorageSync('artistId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid + '/winRecords',
      data: {
        worksid: worksid,
        token: token,
        page: 1,
        limit: 5
      },
      method: "GET",
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      success: res => {
        console.log("获奖记录", res.data);
        that.setData({
          prizes: res.data.page.list,
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