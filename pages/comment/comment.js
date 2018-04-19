// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: {},
    comment:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var artistid = options.id;
    var token = wx.getStorageSync('token');
        wx.request({
          url: 'https://yishujia.yicuichina.com/api/artist/' + artistid + '/famousRemarks',
          data: {
            token: token,
            page: 1,
            limit: 5
          },
          method: "GET",
          header: { 'Content-Type': 'application/json' },
          dataType: "json",
          success: res => {
            console.log("comment页1", res.data);
            that.setData({
              comment: res.data.page.list,
            })
          },
        })
  },
  oncommentsTap: function (event) {
    var famousRemarkId = event.currentTarget.dataset.famousremarkid;
    wx.navigateTo({
      url: "/pages/comments/comments?id=" + famousRemarkId
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