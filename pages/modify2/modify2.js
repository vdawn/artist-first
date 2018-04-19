// pages/modify2/modify2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    signature: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  signatureInput: function (e) {
    var signature = e.detail.value;
    wx.setStorageSync('signature', signature);
    this.setData({
      signature: wx.getStorageSync('signature')
    })

  },
  goeditTap: function () {
    var token = wx.getStorageSync('token');
    var signature = wx.getStorageSync('signature');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
        signature: signature
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("成功", res.data)
        wx.removeStorageSync("signature");
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
    var artistid = wx.getStorageSync('artistId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid,
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("modify2页", res.data);
        this.setData({
          signature: res.data.artist.userEntity.signature
        })
        console.log(res.data.artist.userEntity.signature)
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