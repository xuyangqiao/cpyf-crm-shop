<template>
  <div class="container">
    <div class="header">
      <tab v-model="selected">
        <tab-item @on-item-click="onItemClick(1)">全部客户</tab-item>
        <tab-item @on-item-click="onItemClick(2)" v-if="$store.state.userDefault.level !== 5">已核算客户</tab-item>
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
        tabSelect: -1
      }
    },
    computed: {
      selected () {
        if (location.hash === '#/not') {
          return 0
        } else {
          return 1
        }
      }
    },
    methods: {
      onItemClick (index) {
        if (index === this.tabSelect) {
          return
        }
        this.tabSelect = index
        if (index === 1) {
          this.$router.push('/not')
        } else {
          this.$router.push('/already')
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
