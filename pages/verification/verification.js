// pages/verification/verification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //手机号
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        console.log("verification页发送验证码", res.data);
      },
    })
    console.log("1111122223333", phone)
  },
  // 保存
  save: function (e) {
    var token = wx.getStorageSync('token');
    var phone = this.data.phone;
    var code = this.data.code;
    this.checkPhone(phone, code, token);
    this.infoSave(phone, code, token);
  },
  //验证验证码
  checkPhone: function (phone, code, token) {
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/codes',
      data: {
        phone: phone,
        code: code
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("verification页验证验证码", res.data.code)
      },
    })
  },
  //保存方法
  infoSave: function (phone, code, token) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
        mobile: phone,
        code, code
      },
      method: "PUT",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        console.log("verification页保存", res.data);
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
    var token = wx.getStorageSync('token');
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/user',
      data: {
      },
      method: "GET",
      header: { 'Content-Type': 'application/json', token: token },
      dataType: "json",
      success: res => {
        // console.log("verification页", res.data);
        this.setData({
          phone: res.data.mobile
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