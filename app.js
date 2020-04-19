//app.js
App({
  onLaunch: function () {
   
    wx.db = {};

    this.initToast();

    const sysInfo = wx.getSystemInfoSync();
    wx.db.statusBarHeight = sysInfo.statusBarHeight;
    wx.db.navBarHeight = sysInfo.platform=='android' ? 48: 44;
  },

  initToast: function () {
    const time = 1500

    
    wx.db.toast = (title,duration = time) => {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: duration
      });
    };
    wx.db.toastError = (title,duration = time) => {
      wx.showToast({
        title: title,
        icon: 'none',
        image: '/assets/imgs/ic_search.png',
        duration: duration
      });
    };
    wx.db.toastSuccess = (title,duration = time) => {
      wx.showToast({
        title: title,
        icon: 'success',
        duration: duration
      });
    }
  },

  globalData: {
    userInfo: null
  }
})