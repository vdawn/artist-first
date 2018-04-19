// pages/stuf/stuf.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headpic: "",//头像
    defaultPicurl: "",//自行上传的头像
    //card: [],//封面
    artistName: "",//存储的艺术家名
    bgPic: "",//存储的背景图片
    refuse: "",
    nickName: "",//昵称
    signature: "",//个签
    userName: "",//真实姓名
    phone: "",//手机号
    code: "" , //验证码
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 拿到头像
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          headpic: res.userInfo.avatarUrl,
        })
      }
    })

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
        that.setData({
          defaultPicurl: res.tempFilePaths[0],
        })
        that.setData({
          headpic: res.tempFilePaths[0],
        })
      }
    })
  },
  // 跳转编辑封面
  gocardTap: function () {
    wx.navigateTo({
      url: "/pages/card/card"
    })
  },
  // 拿所有input的value
  nickNameInput: function (e) {
    var nickName = e.detail.value;
    this.setData({
      nickName: nickName,
    })
  },
  signatureInput: function (e) {
    var signature = e.detail.value;
    this.setData({
      signature: signature,
    })
  },
  userNameInput: function (e) {
    var userName = e.detail.value;
    this.setData({
      userName: userName,
    })
  },
  phoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone,
    })
  },
  codeInput: function (e) {
    var code = e.detail.value;
    this.setData({
      code: code,
    })
  },

  // 获取验证码
  verification: function () {
    var token = wx.getStorageSync('token');
    var phone = String(this.data.phone);
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/codes',
      data: {
        "phone": phone
      },
      method: "POST",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("stuf页获取验证码", res.data);
      },
    })
  },
  // 保存
  gostuffTap: function (e) {
    var that = this;
    var token = wx.getStorageSync('token');
    var phone = this.data.phone;
    var code = this.data.code;
    var nickName = this.data.nickName;
    var signature = this.data.signature;
    var picurl = that.data.headpic//默认  
    var userName = this.data.userName;
    var defaultPicurl = that.data.defaultPicurl//上传
    //  背景图未更换
    var refuse = this.data.refuse;
    // console.log(refuse);

    var bgPic = wx.getStorageSync('bgPic');
    var artistName = wx.getStorageSync('artistName');
    // 上传封面所有内容
    that.uploadUtils(bgPic, artistName, token)
    if (refuse == "https://ysj.yicuichina.com/image/a/bg.png") {
      // 提示换封面
      wx.showModal({
        title: '提示',
        content: '请更换一张你喜欢的封面',
        cancelText: "取消",
        confirmColor: "确定",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/card/card"
            })
          } else if (res.cancel) {
          }
        }
      });
    } else {

      if (defaultPicurl == picurl) {//代表是不是默认的头像
        // 上传头像换取路径
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
            // console.log("stuf页3", res.data);
            var url = JSON.parse(res.data).url;
            // console.log(url)
            that.setData({
              headpic: url,
            })
            //校验验证码是正确
            this.checkPhone(phone, code, token);
            this.infoSave(url, nickName, signature, userName, phone, code)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      } else {
        //代表是默认的头像
        this.checkPhone(phone, code, token);
        this.infoSave(picurl, nickName, signature, userName, phone, code)
      }
    }
  },
  checkPhone: function (phone, code, token) {
    wx.request({ //验证验证码
      url: 'https://yishujia.yicuichina.com/api/codes',
      data: {
        phone: phone,
        code: code
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("stuf页验证验证码", res.data.code)
      },
    })
  },
  //保存方法
  infoSave: function (avatar, nickName, signature, userName, phone, code) {
    var userId = wx.getStorageSync('userId');
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
        userId: userId,
        avatar: this.data.headpic,
        nickName: nickName,
        signature: signature,
        userName: userName,
        mobile: phone,
        code, code
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("stuf页保存", res.data);
        
        wx.navigateTo({
          url: "/pages/stuff/stuff"
        })
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
    var bgPic = wx.getStorageSync('bgPic');
    var artistName = wx.getStorageSync('artistName');
    this.setData({
      artistName: artistName,//存储的艺术家名
      bgPic: bgPic,//存储的背景图片
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

  },
  //上传通用方法
  uploadUtils: function (bgPic, artistName, token) {
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/cover',
      data: {
        bgPic: bgPic,
        artistName: artistName,
      },
      method: "POST",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("stuf页产生artistid",res.data)
        
        // 首次替换新artistid
        wx.setStorageSync('artistId', res.data.cover.artistId);
        var artistid = wx.getStorageSync('artistId');

        // 清除缓存
        wx.removeStorageSync("bgPic");
        wx.removeStorageSync("artistName");
      },
    })
  }
})