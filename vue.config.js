module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  css:{
    extract:true
  },

  publicPath: process.env.NODE_ENV === 'production'
  ? ''
  : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
