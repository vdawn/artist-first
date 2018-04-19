// pages/release/release.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pichide: false,
    main: "/image/a/555.png",//主图
    imgs: [],
    opusname: "",
    enshrine: "",
    defaul: "RMB",
    hide: true,
    hide2: true,
    year: "2018",
    collectListId: "",//收藏记录id
    winRecordId: "",//获奖记录id
    success1: "",
    success2: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择主图
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
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        var mainpic = res.tempFilePaths[0]
        that.setData({
          main: res.tempFilePaths[0],
        })
        var token = wx.getStorageSync('token');
        wx.uploadFile({
          url: 'https://yishujia.yicuichina.com/api/upload',
          filePath: mainpic,
          name: 'file',
          formData: {
            'token': token
          },
          method: "POST",
          header: { 'Content-Type': 'multipart / form - data' },
          success: res => {
            //换取后的主图
              wx.setStorageSync('mainurl', JSON.parse(res.data).url);
          },
        })
      }
    })
  },

  // 继续上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          imgs.push(tempFilePaths[i]);
          if (imgs.length >= 8) {

            that.setData({
              imgs: imgs,
              pichide: true
            });
            return false;

          }
        }
        that.setData({
          imgs: imgs
        });

      },
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      pichide: false
    });
  },
  // 创作年份
  bindYearChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      year: e.detail.value
    })
  },
  goopusnameTap: function () {
    wx.navigateTo({
      url: "/pages/opusname/opusname"
    })
  },
  gocollectaddTap: function () {
    wx.navigateTo({
      url: "/pages/collectadd/collectadd"
    })
  },
  goawardaddTap: function () {
    wx.navigateTo({
      url: "/pages/awardadd/awardadd"
    })
  },
  goenshrineTap: function () {
    var enshrine = this.data.enshrine
    wx.navigateTo({
      url: "/pages/enshrine/enshrine"
    })
  },
  gosizeTap: function () {
    wx.navigateTo({
      url: "/pages/size/size"
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
    var opusname = wx.getStorageSync('opusname');
    var enshrine = wx.getStorageSync('enshrine');
    this.setData({
      opusname: opusname,
      enshrine: enshrine
    })
  },
  // 发布跳管理页
  gostarTap: function () {
    let that = this;
    var images = that.data.imgs; //附图列表
    var mainurl = wx.getStorageSync('mainurl');//主图
    var token = wx.getStorageSync('token');
    var opusname = this.data.opusname //作品名
    var enshrine = this.data.enshrine //馆藏
    var year = this.data.year //年份
    var width = wx.getStorageSync('width');
    var height = wx.getStorageSync('height');
    var collectors = wx.getStorageSync('collectors');//藏家
    var institution = wx.getStorageSync('institution');//交易机构
    var price = wx.getStorageSync('price');//价格
    var sendunit = wx.getStorageSync('sendunit');//单位
    var date1 = wx.getStorageSync('date1');//日期
    var prize = wx.getStorageSync('prize');//奖项
    var awards = wx.getStorageSync('awards');//颁奖机构
    var date = wx.getStorageSync('date');//日期
    // console.log("1---------",opusname, "+", enshrine, "+", width, "+", height)
    // console.log("2---------",collectors, "+", institution, "+", price, "+", unit, "+", date1)
    // console.log("3---------",prize, "+", awards, "+", date,)
    // 上传九张图片换取url
    for (var i = 0; i < images.length; i++) {
      var x = images[i]
      wx.uploadFile({
        url: 'https://yishujia.yicuichina.com/api/upload',
        filePath: x,
        name: 'file',
        formData: {
          'token': token
        },
        method: "POST",
        header: { 'Content-Type': 'multipart / form - data' },
        success: res => {
          // var all = []
          // var newurl = JSON.parse(res.data).url        
          // console.log(newurl)

          // function next() {
          //   i++;
          //   newurl = i;
          //   fucc();
          // } 
        },
      })
    }
    if (opusname == "") {
      that.setData({
        hide: false
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    } 
    else if (mainurl==""){
      that.setData({
        hide2: false
      })
      setTimeout(function () {
        that.setData({
          hide2: true
        })
      }, 1700)
    }
    // else if (collectors==""){
    //  console.log("请填写藏家")
    // } else if (institution == "") {
    //   console.log("请填写交易机构")
    // } else if (price == "") {
    //   console.log("请填写价格")
    // } else if (date1 == "") {
    //   console.log("请填写藏家中的日期")
    // } else if (prize == "") {
    //   console.log("请填写奖项")
    // } else if (awards == "") {
    //   console.log("请填写颁奖机构")
    // } else if (date == "") {
    //   console.log("请填写获奖记录的日期")
    // }
    else {
      //收藏记录
      if (sendunit == "") {
        sendunit = this.data.defaul
      }
      wx.request({
        url: 'https://yishujia.yicuichina.com/api/collectlist',
        data: {
          collector: collectors,
          bourse: institution,
          price: price,
          unit: sendunit,
          date: date1,
          creationYear: year
          // voice: voice    音频url
        },
        method: "POST",
        header: { 'Content-Type': 'application/json', token: token },
        dataType: "json",
        success: res => {
          // console.log("release页收藏记录", res.data);
          wx.setStorageSync('collectlistid', res.data.collectlistId);
          // 获奖记录
          wx.request({
            url: 'https://yishujia.yicuichina.com/api/winrecord',
            data: {
              awards: prize,
              organization: awards,
              date: date,
            },
            method: "POST",
            header: { 'Content-Type': 'application/json', token: token },
            dataType: "json",
            success: res => {
              // console.log("release页获奖记录", res.data);
              wx.setStorageSync('winRecordid', res.data.winrecordId);
              // 收藏记录和获奖记录发布时获得的两个id
              var collectlistid = wx.getStorageSync('collectlistid');            
              var winRecordid = wx.getStorageSync('winRecordid');
              // console.log(collectlistid)
              // console.log(winRecordid)
              // 总发布
              wx.request({
                url: 'https://yishujia.yicuichina.com/api/works',
                data: {
                  pic: mainurl,
                  collectListEntities: [{
                    collectListId: collectlistid
                  }],
                  winRecordEntities: [{
                    winRecordId: winRecordid
                  }],
                  worksTitle: opusname,
                  museumarts: enshrine,
                  width: width,
                  height: height
                },
                method: "POST",
                header: { 'Content-Type': 'application/json', token: token },
                dataType: "json",
                success: res => {
                  // console.log("release页发布作品", res.data);
                  wx.setStorage({
                    key: "worksid",
                    data: res.data.works.worksId,
                    success: function () {
                    }
                  })
                  wx.removeStorageSync("mainurl");
                  wx.removeStorageSync("opusname");
                  wx.removeStorageSync("enshrine");
                  wx.removeStorageSync("year");
                  wx.removeStorageSync("width");
                  wx.removeStorageSync("height");
                  wx.removeStorageSync("collectors");
                  wx.removeStorageSync("institution");
                  wx.removeStorageSync("price");
                  wx.removeStorageSync("sendunit");
                  wx.removeStorageSync("date1");
                  wx.removeStorageSync("prize");
                  wx.removeStorageSync("awards");
                  wx.removeStorageSync("date");
                  wx.removeStorageSync("voice");
                  wx.navigateBack();
                },
              })
            },
          })
        },
      })
    }
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