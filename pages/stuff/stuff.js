// pages/stuff/stuff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: [],
    artistName: "",//存储的艺术家名
    bgPic: "",//存储的背景图片
    hint: true, //提示语
    list: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  gocardTap: function () {
    wx.navigateTo({
      url: "/pages/revisecard/revisecard"
    })
  },
  goreleaseTap: function (e) {
    wx.navigateTo({
      url: "/pages/release/release"
    })
  },
  goeditTap: function (event) {
    wx.navigateTo({
      url: "/pages/edit/edit"
    })
  },
  gointroduceTap: function (e) {
    wx.navigateTo({
      url: "/pages/introduce/introduce"
    })
  },
  // 五个导航
  gointroduceaddTap: function (e) {
    // var intro = e.currentTarget.dataset.intro;
    wx.navigateTo({
      url: "/pages/introduceadd/introduceadd"
    })
  },
  gocollectionaddTap: function (e) {
    // var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/collectionadd/collectionadd"
    })
  },
  goprizesaddTap: function (e) {
    // var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/prizesadd/prizesadd"
    })
  },
  gocommentaddTap: function (e) {
    // var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/commentadd/commentadd"
    })
  },
  gomienaddTap: function (e) {
    // var artistid = e.currentTarget.dataset.artistid;
    wx.navigateTo({
      url: "/pages/mienadd/mienadd"
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
      url: 'https://yishujia.yicuichina.com/api/artist',
      data: {
        page: 1,
        limit: 3
      },
      method: "GET",
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      success: res => {
        // console.log("stuff页", res.data);
        that.setData({
          artistName: res.data.page.list[0].coverEntity.artistName,
          bgPic: res.data.page.list[0].coverEntity.bgPic,
       })
        // 首次存储coverid
        wx.setStorageSync('coverId', res.data.page.list[0].coverEntity.coverId);
        var coverid = wx.getStorageSync('coverId');
      },
    })
// 获取昵称，个签
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist/' + artistid,
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("stuff页1", res.data);
        // wx.setStorageSync('nickName', res.data.artist.userEntity.nickName);
        // wx.setStorageSync('signature', res.data.artist.userEntity.signature);
        that.setData({
          information: res.data.artist
        })
        // 判断字段为空让提示图显示
        if (res.data.artist.intro == null) {
          that.setData({
            hint: false
          })
        } else {
          that.setData({
            hint: true
          })
        }
      },
    })


    wx.getStorage({
      key: 'worksid',
      success: function (res) {
        var artistid = wx.getStorageSync('artistId');
        var token = wx.getStorageSync('token');
        wx.request({
          url: 'https://yishujia.yicuichina.com/api/artist/' + artistid + '/collectLists',
          data: {
            worksid: res.data,
            token: token,
            page: 1,
            limit: 5
          },
          method: "GET",
          header: { 'Content-Type': 'application/json' },
          dataType: "json",
          success: res => {
            // console.log("stuff页", res.data);
            that.setData({
              list: res.data.page.list
            })

          },
        })
      }
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