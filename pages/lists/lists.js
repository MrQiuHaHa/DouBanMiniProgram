// pages/lists/lists.js
Page({

  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
      
      wx.getStorage({
        key: options.title,
        success: (result) => {
          this.data.movies = result.data;
          this.setData(this.data)
        },
      });
        
  },

})