<template>
  <div class="success-content">
    <div class="content vux-1px-b">
      <div class="logo"></div>
      <h1 class="title">录入成功</h1>
      <div class="btn-wrap">
        <x-button action-type='button' @click.native='$router.go(-1)'>继续录入</x-button>
        <x-button action-type='button' @click.native='$router.push("/not")'>查看客户</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    components: {
      XButton
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

<style lang="scss" scoped>
  .success-content{
    background: #fff;
    text-align: center;
    padding: 1rem 0.3rem 1.5rem;
    height: 100vh;
    box-sizing: border-box;
    .logo{
      margin: 0 auto 0.55rem;
      width: 2rem;
      height: 2rem;
      background: url('./../../assets/images/success-logo.png') no-repeat center center;
      background-size: contain;
    }
    .title{
      color: #2d2d2d;
      font-size: 0.4rem;
    }
    .btn-wrap{
      margin-top: 1rem;
      .weui-btn{
        margin-bottom: 0.3rem;
      }
    }
  }
</style>
