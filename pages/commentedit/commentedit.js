// pages/commentedit/commentedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  titleval:"",
  commentval:"",
  picurl:"/image/a/333.png",
  hide: true,
  hide2: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  titleInput: function (e) {
    this.setData({
      titleval: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      commentval: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 选择图片
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
      count: 1,
      sizeType: ['original'],
      sourceType: [type],
      
      success: function (res) {
        // 换取url
        var picurl = res.tempFilePaths[0];
        var token = wx.getStorageSync('token');
        wx.uploadFile({
          url: 'https://yishujia.yicuichina.com/api/upload',
          filePath: picurl,
          name: 'file',
          formData: {
            'token': token
          },
          method: "POST",
          header: { 'Content-Type': 'multipart / form - data' },
          success: res => {       
            that.setData({
                picurl: JSON.parse(res.data).url
            })
            wx.setStorageSync('picurl', JSON.parse(res.data).url);
          },
        })
      },
    })
  },
  saveTap:function(){
    let that = this;
    var token = wx.getStorageSync('token');
    var title = this.data.titleval;
    var content = this.data.commentval;
    var picurl = wx.getStorageSync('picurl');
    // console.log(token, "+", title, "+", content, "+",picurl)

    if (title == "") {
      that.setData({
        hide: false
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    }
    else if (content == "") {
      that.setData({
        hide2: false
      })
      setTimeout(function () {
        that.setData({
          hide2: true
        })
      }, 1700)
    }else{
      wx.request({
        url: 'https://yishujia.yicuichina.com/api/famousremark',
        data: {
          title: title,
          content: content,
          picUrl: picurl
        },
        method: "POST",
        header: { 'Content-Type': 'application/json', token: token },
        dataType: "json",
        success: res => {
          // console.log("commentedit页", res.data)
          wx.removeStorageSync("picurl");
          wx.navigateBack();
        },
      })
    }
   
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