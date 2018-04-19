// pages/card/card.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: {},
    logo: "https://ysj.yicuichina.com/image/a/bg.png",  // 用来显示
    val: "达芬奇",
    picurl: "",  // 用来显示
    defaultPicurl: "https://ysj.yicuichina.com/image/a/bg.png" //默认背景图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
          picurl: res.tempFilePaths[0],
        })
        // 用来显示
        that.setData({
          logo: that.data.picurl,
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
    var artistName = this.data.val;
    var bgPic = that.data.picurl;
    var token = wx.getStorageSync('token');

    // 存储名字
    wx.setStorageSync('artistName', artistName);
    var artistName = wx.getStorageSync('artistName');
    if (bgPic == "") {
      //存储默认背景
        wx.setStorageSync('bgPic', this.data.defaultPicurl);
        wx.navigateTo({
          url: "/pages/stuf/stuf"
        })
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
          // console.log("card页1", res.data);
          //存储更换的背景
          wx.setStorageSync('bgPic', JSON.parse(res.data).url);
          var bgPic = wx.getStorageSync('bgPic');   
            wx.navigateTo({
              url: "/pages/stuf/stuf"
            })
        
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    // console.log(artistName, "+", bgPic)
   
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

})