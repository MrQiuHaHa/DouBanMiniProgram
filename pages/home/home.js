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
        url: 'https://douban-api.uieee.com/v2/movie/new_movies',
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
      
    // this.loadLocalData()
    this.loadCity(this.loadData)  //因为api调用次数受限，所以第一次使用api加载到缓存数据后就最好把代码切换成上面那句加载本地缓存数据
  },

  loadLocalData: function() {

    for (let index = 0; index < this.data.modules.length; index++) {
      const obj = this.data.modules[index]
      obj.movies = wx.getStorageSync(obj.title);
    }
    this.setData(this.data)
  },

  loadData: function(city) {

    for (let index = 0; index < this.data.modules.length; index++) {

      wx.request({
        url: this.data.modules[index].url,
        data: index==0 ? {city: city} : {},
        header: {
          'content-type': 'json'
        },
        success: (result) => {
          const movies = result.data.subjects
          let obj = this.data.modules[index]
          obj.movies = [];
          for (let idx = 0; idx < movies.length; idx++) {
            let movie = movies[idx].subject || movies[idx]
            this.updateMovie(movie)
            obj.movies.push(movie)
          }
          this.setData(this.data)
          wx.setStorage({
            key: obj.title,
            data: obj.movies
          });
            
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
    
    let stars = parseInt(movie.rating.stars);
    if (stars == 0) return;
    movie.stars = {}
    movie.stars.on = stars%10==0 ? stars/10 : stars/10-0.5
    movie.stars.half = stars%10==0 ? 0:1
    movie.stars.off = movie.stars.half ==0 ? 5-movie.stars.on : 3-movie.stars.on
  },

  viewMore: function(event) {
    const index = event.currentTarget.id;
    const obj = this.data.modules[index];
    wx.navigateTo({
      url: `/pages/lists/lists?title=${obj.title}&url=${obj.url}`
    });
      
  }

})