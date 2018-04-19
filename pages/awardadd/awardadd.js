// pages/awardadd/awardadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prize: "", //奖项
    awards: "",//颁奖机构
    date: "" //日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 获取所有input
  prizeInput: function (e) {
    this.setData({
      prize: e.detail.value
    })
    wx.setStorageSync('prize', e.detail.value);
  },
  awardsInput: function (e) {
    this.setData({
      awards: e.detail.value
    })
    wx.setStorageSync('awards', e.detail.value);
  },
  dateInput: function (e) {
    this.setData({
      date: e.detail.value
    })
    wx.setStorageSync('date', e.detail.value);
  },
  // 填写完成
  goreleaseTap: function () {
    
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var prize = wx.getStorageSync('prize');
    var awards = wx.getStorageSync('awards');
    var date = wx.getStorageSync('date');
    this.setData({
      prize: prize,
      awards: awards,
      date: date
    })
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