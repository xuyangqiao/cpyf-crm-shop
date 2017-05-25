<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" img-set="/themes/home/Index/Index/static/favicon.ico"></router-view>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import footerNav from '@/components/footer'
import api from '@/api'
export default {
  name: 'app',
  components: {
    footerNav
  },
  async created () {
    const {data: {code, data}} = await api.get('/Index/Wechatconfig/MyUserInfo')
    if (code === 200) {
      this.$store.commit('userDefault', data)
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.scss';
@import './assets/css/index.scss';
</style>
