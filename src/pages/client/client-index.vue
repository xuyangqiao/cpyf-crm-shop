<template>
  <div class="container" v-if="userDefault">
    <div class="header">
      <tab v-model="selected">
        <tab-item @on-item-click="onItemClick(1)" v-if="userDefault.menu || userDefault.MenuList.write_customer">录入推荐客户</tab-item>
        <tab-item @on-item-click="onItemClick(2)" v-if="userDefault.menu || userDefault.MenuList.help_reserve">帮助客户预约</tab-item>
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
      tabSelect: 0
    }
  },
  computed: {
    selected () {
      if (!this.userDefault.MenuList.help_reserve || !this.userDefault.MenuList.write_customer) {
        return 0
      }
      if (location.hash.split('?')[0] === '#/') {
        return 0
      } else {
        return 1
      }
    },
    userDefault () {
      return this.$store.state.userDefault
    }
  },
  methods: {
    onItemClick (index) {
      if (index === this.tabSelect) {
        return
      }
      this.tabSelect = index
      if (index === 1) {
        this.$router.push('/')
      } else {
        this.$router.push('/clientapply')
      }
    }
  }
}
</script>

<style lang='scss'>
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
