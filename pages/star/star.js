
//获取应用实例
Page({
  data: {
    show:false,
    hide:true,
    operation1: false,
    operation2: true,
    currentTab: 0, //预设当前项的值
    information:[]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav1: function (e) {
    this.setData({
      show: false,
      hide: true,
      operation1: false,
      operation2: true,
    })
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  swichNav2: function (e) {
    this.setData({
      show: true,
      hide: false,
      operation1: true,
      operation2: false,
    })
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var artistid = wx.getStorageSync('artistId');
    // var artistidd = wx.getStorageSync('artistIdd');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid + "/works",
      // url: 'https://yishujia.yicuichina.com/api/artist/' + artistidd +"/works",
      data:{
        page:1,
        limit:5,
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("star页1", res.data);
        this.setData({
          information: res.data.page.list
        })
      },
    })
  },
  goreleaseTap: function (e) {
    wx.navigateTo({
      url: "/pages/release/release"
    })
  },
  edit1Tap:function(){
  
  },
  edit2Tap: function () {
   
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
