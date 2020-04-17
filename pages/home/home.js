// pages/home/home.js
Page({

  data: {
    movies: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadCity(this.loadData)  
  },

  loadData: function(city) {

    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
      data: {
        city: city
      },
      header: {
        'content-type': 'json'
      },
      success: (result) => {
        this.setData ({
          movies: result.data.subjects
        });
      },
      fail: () => {
        wx.db.toast('获取正在热映信息失败')
      }
    });
      
  },

  loadCity: function(cityCallBack) {

    wx.getLocation({
      success: (resLocation) => {
          wx.request({
              url: 'https://api.map.baidu.com/reverse_geocoding/v3', //仅为示例，并非真实的接口地址
              data: {
                output: 'json',
                coordtype: 'wgs84ll',
                ak: 'TQYhxPRUI6BVI4ITHCpZ2IN0PQbWtFLM',
                location: resLocation.latitude+','+resLocation.longitude
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                let city = res.data.result.addressComponent.city
                city = city.substring(0, city.length - 1)
                cityCallBack && cityCallBack(city)
              },
              fail() {
                wx.db.toast('获取城市信息失败')
              }
          })

      },
      fail:() =>{
        wx.db.toast('获取位置信息失败')
      }
  })
  }
})