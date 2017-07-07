// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
import api from './api'

import 'vux/src/styles/1px.less'

FastClick.attach(document.body)

Vue.use(require('vue-wechat-title')) // 修改标题

// 下拉加载
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false

import { ToastPlugin, WechatPlugin, LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)

router.beforeEach((to, from, next) => {
  directRightUrl()
  store.commit('footerSelect', to.meta.footerSelect)
  next()
})

router.afterEach((from) => {
  Vue.prototype.wechatConfig()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

Vue.prototype.toast = function (text, type = 'text', position = 'middle') {
  this.$vux.toast.show({
    text: text,
    position: position,
    type: type,
    width: 'auto'
  })
}

function directRightUrl () {
  let paths = window.location.href.split('#')
  paths[1] = paths[1] || '/'
  // 老式的#!分隔跳转
  if (paths[0].charAt(paths[0].length - 1) !== '?') {
    paths[0] = `${paths[0]}?`
  }
  if (paths[1].charAt(0) === '!') {
    paths[1] = paths[1].substr(1)
  }
  let url = `${paths[0]}#${paths[1]}`
  if (window.location.href !== url) {
    window.location.href = url
  }
}

// 微信配置
// 配置微信SDK
Vue.prototype.wechatConfig = async function () {
  const {data: {code, data}} = await api.get('/Index/Wechatconfig/WechatConfig')
  if (code === 200 && data) {
    Vue.wechat.config({
      debug: false,
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: ['hideMenuItems', 'chooseWXPay', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage', 'previewImage', 'getLocalImgData', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    Vue.wechat.hideMenuItems({
      menuList: ['menuItem:share:QZone', 'menuItem:share:qq', 'menuItem:share:weiboApp']
    })
    Vue.wechat.error(function (res) {
      console.log(res)
    })
  }
}

Vue.prototype.handUrl = (url) => {
  url = url.split('#')[1]
  return url
}

Vue.prototype.wechatShare = (share) => {
  const url = location.origin + '/?' + 'agentid=' + store.state.userDefault.agentId + '&share_url=' + share.link + '?'
  Vue.wechat.onMenuShareTimeline({
    title: share.title, // 分享标题
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: share.img, // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
  })
  Vue.wechat.onMenuShareAppMessage({
    title: share.title, // 分享标题
    desc: share.desc, // 分享描述
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: share.img, // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
  })
}
