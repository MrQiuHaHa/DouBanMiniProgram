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
        console.log(result)
        let movies = result.data.subjects
        for (let index = 0; index < movies.length; index++) {
          this.updateMovie(movies[index])
        }
        this.setData ({
          movies: movies
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
              url: 'https://api.map.baidu.com/reverse_geocoding/v3',
              data: {
                output: 'json',
                coordtype: 'wgs84ll',
                ak: 'TQYhxPRUI6BVI4ITHCpZ2IN0PQbWtFLM',
                location: resLocation.latitude+','+resLocation.longitude
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
  },

  updateMovie: (movie) => {
    let stars = parseInt(movie.rating.stars);
    movie.stars = {}
    movie.stars.on = stars/10
    movie.stars.half = stars%10==0 ? 0:1
    movie.stars.off = stars%10==0 ? 5-stars/10:4-stars/10
  }

})