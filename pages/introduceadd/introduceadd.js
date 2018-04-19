// pages/introduceadd/introduceadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: "",
    intro: "",
    hide: true,
    txthide:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },
  bindTextAreaBlur: function (e) {
    this.setData({
      val: e.detail.value
    })
  },
  gostuffTap: function () {
    var token = wx.getStorageSync('token');
    var intro = this.data.val
    // console.log(intro)
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist',
      data: {
        intro: intro,
      },
      method: "POST",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("简介页提交简介", res.data)
      },
    })
    wx.navigateBack();
  },
  gointro:function(){
    wx.navigateTo({
      url: "/pages/intro/intro"
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
    var artistid = wx.getStorageSync('artistId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid,
      data: {
        token: token
      },
      method: "GET",
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      success: res => {
        // console.log(res.data)
        that.setData({
          intro: res.data.artist.intro,
        })
        var intro = res.data.artist.intro;
        // 发请求判断有无简介字段
        if (intro == undefined) {
          this.setData({
            hide: false,
            txthide:true
          })
        }else{
          this.setData({
            hide: true,
            txthide: false
          })
        }
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