<template>
  <tabbar v-model="footerSelect" v-show="footerShow" v-if="userDefault && (userDefault.menu || userDefault.MenuList.login)">
    <tabbar-item link="/" v-if="userDefault.menu || userDefault.MenuList.write_customer || userDefault.MenuList.help_reserve">
      <img class="default" slot="icon" src="../assets/images/icon/footer-enter.png">
      <img class="active" slot="icon" src="../assets/images/icon/footer-enter-active.png">
      <span slot="label">录入</span>
    </tabbar-item>
    <tabbar-item link="/not" v-if="userDefault.menu || userDefault.MenuList.customer">
      <img class="default" slot="icon" src="../assets/images/icon/footer-client.png">
      <img class="active" slot="icon" src="../assets/images/icon/footer-client-active.png">
      <span slot="label">客户</span>
    </tabbar-item>
    <tabbar-item link="/poster" v-if="userDefault.menu || userDefault.MenuList.poster">
      <img class="default" slot="icon" src="../assets/images/icon/footer-share.png">
      <img class="active" slot="icon" src="../assets/images/icon/footer-share-active.png">
      <span slot="label">分享</span>
    </tabbar-item>
    <tabbar-item link="/user">
      <img class="default" slot="icon" src="../assets/images/icon/footer-user.png">
      <img class="active" slot="icon" src="../assets/images/icon/footer-user-active.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    computed: {
      footerSelect () {
        return this.$store.state.footerSelect
      },
      footerShow () {
        return this.$store.state.footerShow
      },
      userDefault () {
        return this.$store.state.userDefault
      }
    }
  }
</script>

<style lang="scss">
.weui-tabbar{
  height: 1rem;
  position: fixed !important;
  .weui-tabbar__item{
    padding-top: 0.15rem;
    img.active{
      display: none;
    }
    &.weui-bar__item_on{
      img.default{
        display: none;
      }
      img.active{
        display: block;
      }
    }
    .weui-tabbar__icon{
      width: 0.4rem;
      height: 0.4rem;
    }
    .weui-tabbar__label{
      color: #2d2d2d;
      font-size: 0.26rem;
    }
  }
}
</style>
