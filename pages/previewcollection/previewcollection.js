// pages/previewcollection/previewcollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewcollection:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var worksid = options.id;
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/works/' + worksid,
      data: {
        token: token,
      },
      method: "GET",
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      success: res => {
        console.log("previewcollection页", res.data);

        that.setData({
          previewcollection: res.data.works
        })
        // 设置作品标题
        var title = res.data.works.worksTitle
        wx.setNavigationBarTitle({ title: title });
      },
    });
  },
  gorevise:function(){
    wx.navigateTo({
      url: "/pages/revisecollection/revisecollection"
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