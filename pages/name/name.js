// pages/name/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  val:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  userNameInput: function (e) {
    this.setData({
      val: e.detail.value
    })
  },

  save:function(){
    // var userId = wx.getStorageSync('userId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
        userName: this.data.val
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("name页", res.data);
        wx.navigateBack();
      },
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
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("name页", res.data);
     
        this.setData({
          val: res.data.userName
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