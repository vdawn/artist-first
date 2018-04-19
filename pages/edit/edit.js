// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    signature: "",
    headpic: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 选择头像图片
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
    var token = wx.getStorageSync('token');
    let that = this;
    wx.chooseImage({
      sizeType: ['original'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        // 换取url
        var picurl = res.tempFilePaths[0];
        var token = wx.getStorageSync('token');
        wx.uploadFile({
          url: 'https://yishujia.yicuichina.com/api/user/saveAvatar',
          filePath: picurl,
          name: 'file',
          formData: {
            'token': token
          },
          method: "POST",
          header: { 'Content-Type': 'multipart / form - data' },
          success: res => {
            wx.setStorageSync('headpic', JSON.parse(res.data).url);
            // 修改user
            var headpic = wx.getStorageSync('headpic');
            var token = wx.getStorageSync('token');
            wx.request({
              url: 'https://yishujia.yicuichina.com/api/user',
              data: {
                avatar: headpic
              },
              method: "PUT",
              header: { 'Content-Type': 'application/json', token: token },
              dataType: "json",
              success: res => {
                console.log("edit页3", res.data);
                that.setData({
                  headpic: res.data.user.avatar
                })
              },
            })
          },
        })
        
      },
      
    })

  },
  gomodify1Tap: function (event) {
    wx.navigateTo({
      url: "/pages/modify1/modify1"
    })
  },
  gomodify2Tap: function (event) {
    wx.navigateTo({
      url: "/pages/modify2/modify2"
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
        console.log("edit页1", res.data);
        this.setData({
          nickName: res.data.artist.userEntity.nickName,
          signature: res.data.artist.userEntity.signature,
          headpic: res.data.artist.userEntity.avatar
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