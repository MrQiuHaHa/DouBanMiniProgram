// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: null
    },
    navBarColor: {
      type: String,
      value: '#FFFFFF'
    },
    statusBarColor: {
      type: String,
      value: '#FFFFFF'
    },
    backHidden: {
      type: String,
      value: 'false'
    },
    homeHidden: {
      type: String,
      value: 'false'
    },
    titleColor: {
      type: String,
      value: '#333333'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    goBack: function() {
      wx.navigateBack({
        delta: 1
      });
        
    },
    goHome: function() {
      wx.navigateBack({
        delta: 20
      });
        
    }
  },

  lifetimes: {
    attached: function() {
        
      const statusBarStyle = `
      height: ${ wx.db.statusBarHeight }px;
      background-color: ${ this.properties.statusBarColor }`;

      const navBarStyle = `
      color: ${ this.properties.titleColor };
      height: ${ wx.db.navBarHeight }px;
      background-color: ${ this.properties.navBarColor }`;

      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle
      })
    }
  }
})
