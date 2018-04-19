// pages/revisecard/revisecard.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: {},
    bgPic: "",  //用来显示
    artistName:"",
    val: "达芬奇",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var artistid = wx.getStorageSync('artistId');
    var token = wx.getStorageSync('token');
    var coverid = wx.getStorageSync('coverId');
    // 获取封面
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/cover/' + coverid,
      data: {
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("revisecard页", res.data);
        that.setData({
          artistName: res.data.cover.artistName,
          bgPic: res.data.cover.bgPic
          
          // artistName: res.data.page.list[0].artistName,
          // bgPic: res.data.page.list[0].bgPic,
        })
      },
    })
  },
  chooseImageTap: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        that.setData({
          bgPic: res.tempFilePaths[0],
        })
      }
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      val: e.detail.value
    })
  },
  saveTap: function (e) {
    let that = this;
    var artistName = that.data.val;
    var bgPic = that.data.bgPic;
    var token = wx.getStorageSync('token');
    // 存储名字
    if (bgPic == "") {
      bgPic = that.data.bgPic;
    } else {
      // 上传图片换取url
      wx.uploadFile({
        url: 'https://yishujia.yicuichina.com/api/upload',
        filePath: bgPic,
        name: 'file',
        formData: {
          'token': token
        },
        method: "POST",
        header: { 'Content-Type': 'multipart / form - data' },
        success: res => {
          // console.log("revisecard页", res.data);
          var url = JSON.parse(res.data).url;
          var artistName = that.data.val;
          var token = wx.getStorageSync('token');
          var coverid = wx.getStorageSync('coverId');
          that.uploadUtils(url, artistName, token, coverid)                 
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }

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

  },
  //上传通用方法
  uploadUtils: function (bgPic, artistName, token, coverid) {
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/cover/' + coverid,
      data: {
        bgPic: bgPic,
        artistName: artistName,
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("revisecard页", res.data)
        wx.navigateBack();
      },
    })
  }
})