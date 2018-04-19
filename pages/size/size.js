// pages/size/size.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: "",
    height: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 获取所有input
  widthInput: function (e) {
    this.setData({
      width: e.detail.value
    })
    wx.setStorageSync('width', e.detail.value);
  },
  heightInput: function (e) {
    this.setData({
      height: e.detail.value
    })
    wx.setStorageSync('height', e.detail.value);
  },
  goreleaseTap: function () {
    wx.navigateBack();
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
    var width = wx.getStorageSync('width');
    var height = wx.getStorageSync('height');
    this.setData({
      width: width,
      height:height
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