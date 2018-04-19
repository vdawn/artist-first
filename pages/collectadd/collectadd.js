// pages/collectadd/collectadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectors: "", //藏家
    institution: "",//交易机构
    price: "",   //价格
    date1: "",   //日期
    unit: "人民币", //页面显示的单位
    sendunit: "" //给后台发送的单位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  // 获取所有input
  collectorsInput: function (e) {
    this.setData({
      collectors: e.detail.value
    })

  },
  institutionInput: function (e) {
    this.setData({
      institution: e.detail.value
    })

  },
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })

  },
  dataInput: function (e) {
    this.setData({
      date1: e.detail.value
    })

  },
  // 选择单位
  chooseMoneyTap: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['人名币', '港币', '美元'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.setData({
              unit: "人民币"
              //  unit: "RMB"
            })
          } else if (res.tapIndex == 1) {
            that.setData({
              unit: "港币"
              // unit: "HKD"
            })
          } else if (res.tapIndex == 2) {
            that.setData({
              unit: "美元"
              //  unit: "USD"
            })
          }
        }
        // console.log("单位", that.data.unit)
        if (that.data.unit == "人民币") {
          that.setData({
            sendunit: "RMB"
          })
        } else if (that.data.unit == "港币") {
          that.setData({
            sendunit: "HKD"
          })
        } else if (that.data.unit == "美元") {
          that.setData({
            sendunit: "USD"
          })
        }
        wx.setStorageSync('unit', that.data.unit);
        wx.setStorageSync('sendunit', that.data.sendunit);
        // console.log(wx.getStorageSync('sendunit'));
      }
    })

  },
  // 填写完成
  goreleaseTap: function () {
    wx.setStorageSync('collectors', this.data.collectors);
    wx.setStorageSync('institution', this.data.institution);
    wx.setStorageSync('price', this.data.price);
    wx.setStorageSync('date1', this.data.date1);
    wx.navigateBack();
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


    var collectors = wx.getStorageSync('collectors');
    var institution = wx.getStorageSync('institution');
    var price = wx.getStorageSync('price');
    var date1 = wx.getStorageSync('date1');
    var unit = wx.getStorageSync('unit');
    if (unit == "") {
      this.setData({
        unit: "人民币"
      })
    } else {
      this.setData({
        unit: unit
      })
    }
    this.setData({
      collectors: collectors,
      institution: institution,
      price: price,
      date1: date1,
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