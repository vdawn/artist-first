// pages/modify1/modify1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  nickNameInput: function (e) {
    var nickName = e.detail.value;
    wx.setStorageSync('nickName', nickName);
    this.setData({
      nickName: wx.getStorageSync('nickName')
    })

  },
  goeditTap: function () {
    var token = wx.getStorageSync('token');
    var nickName = wx.getStorageSync('nickName');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
        nickName: nickName
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("成功",res.data)
        wx.removeStorageSync("nickName");
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
        console.log("modify1页1", res.data);
        this.setData({
          nickName: res.data.artist.userEntity.nickName
        })
        console.log(res.data.artist.userEntity.nickName)
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