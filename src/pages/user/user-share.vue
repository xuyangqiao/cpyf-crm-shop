<template>
<div class="share-wrap">
  <div class="header">
    <tab v-model="selected">
      <tab-item @on-item-click="onItemClick(1)">专家团队</tab-item>
      <tab-item @on-item-click="onItemClick(2)">推广二维码</tab-item>
    </tab>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  export default {
    components: {
      Tab,
      TabItem
    },
    data () {
      return {
        selected: 0
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path === '/doctorlist') {
        this.selected = 0
      } else {
        this.selected = 1
      }
      next()
    },
    created () {
      if (window.location.hash === '#/doctorlist') {
        this.selected = 0
      } else {
        this.selected = 1
      }
    },
    methods: {
      onItemClick (index) {
        if (index === this.tabSelect) {
          return
        }
        this.tabSelect = index
        if (index === 1) {
          this.$router.push('/doctorlist')
        } else {
          this.$router.push('/share')
        }
      }
    },
    mounted () {
      this.$wechat.ready(() => {
        this.wechatShare({
          title: `${this.$store.state.userDefault.name}推荐您预约川派医方馆疼痛专家`,
          link: '/',
          img: 'http://qpic.cn/6oICaLv7r',
          desc: '专家号源紧张，赶紧预约，川派疼痛医生集团，专治头颈肩腰腿痛！'
        })
      })
    }
  }
</script>

<style lang="scss">
  .share-wrap{
    min-height: 100vh;
    // background: #fff;
  }
  .header{
    .vux-tab{
      height: 1.06rem;
      .vux-tab-item{
        font-size: 18px;
        line-height: 1.06rem;
      }
    }
    .vux-tab-ink-bar{
      &:after{
        content: '';
        display: block;
        position: absolute;
        z-index: 2;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #09bb07;
      }
    }
  }
</style>
