// pages/home/home.js
Page({

  data: {
    modules: [
      {
        title: '影院热映',
        url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
        movies: []
      },
      {
        title: '新片榜',
        url: 'https://douban-api.uieee.com/v2/movie/new-movies',
        movies: []
      },
      {
        title: '口碑榜',
        url: 'https://douban-api.uieee.com/v2/movie/weekly',
        movies: []
      },
      {
        title: '北美票房榜',
        url: 'https://douban-api.uieee.com/v2/movie/us_box',
        movies: []
      },
      {
        title: 'Top250',
        url: 'https://douban-api.uieee.com/v2/movie/top250',
        movies: []
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadCity(this.loadData)  
  },

  loadData: function(city) {

    for (let index = 0; index < 5; index++) {

      wx.request({
        url: this.data.modules[index].url,
        data: {city: city},
        header: {
          'content-type': 'json'
        },
        success: (result) => {
          console.log(result)
          let movies = result.data.subjects
          let obj = this.data.modules[index]
          for (let idx = 0; idx < movies.length; idx++) {
            let movie = movies[idx] || movies[idx].subject
            this.updateMovie(movie)
            obj.movies.push(movie)
          }
          // this.data.modules[index].movies = movies
          this.setData(this.data)
        },
        fail: () => {
          wx.db.toast('获取正在热映信息失败')
        }
      });
      
    }
    
      
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
    movie.stars = {}
    let stars = parseInt(movie.rating.stars);
    if (stars == 0) return;
    
    movie.stars.on = stars%10==0 ? stars/10 : stars/10-0.5
    movie.stars.half = stars%10==0 ? 0:1
    movie.stars.off = movie.stars.half ==0 ? 5-movie.stars.on : 3-movie.stars.on
  }

})