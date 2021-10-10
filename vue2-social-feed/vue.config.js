module.exports = {
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "Amity Social Cloud Social Feed";
              return args;
          })
  },
  pwa: {
    name: 'vue2-social-feed',
    themeColor: '#FFFFFF',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    manifestOptions: {
      start_url: null
    }
    // configure the workbox plugin
    //   workboxPluginMode: 'InjectManifest'
  },
  devServer: {
    disableHostCheck: true
  }
}
