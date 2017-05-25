<template>
  <div class="container">
    <div class="wrap">
      <qrcode :value="doctorCode" type="img" class="code"></qrcode>
      <h2 class="title">专家团队推广二维码</h2>
      
      <p class="desc">长按保存，即可发布朋友圈</p>
    </div>
    <!--<router-link to='/share' class="text-title">点击进入推广页面，将页面分享给朋友即可。</router-link>-->

    <div class="wrap">
      <qrcode :value="shareCode" type="img" class="code"></qrcode>
      <h2 class="title">在线预约推广二维码</h2>
      <p class="desc">长按保存，即可发布朋友圈</p>
    </div>
    <!--<router-link to='/doctorshare' class="text-title">点击进入专家推广页面，将页面分享给朋友即可。</router-link>-->
  </div>
</template>

<script>
  import { Qrcode } from 'vux'
  export default {
    components: {
      Qrcode
    },
    computed: {
      doctorCode () {
        return location.origin + '/?' + 'agentid=' + this.$store.state.userDefault.agentId + '&share_url=/doctorlist'
      },
      shareCode () {
        return location.origin + '/?' + 'agentid=' + this.$store.state.userDefault.agentId + '&share_url=/'
      }
    },
    mounted () {
      this.$wechat.ready(() => {
        this.wechatShare({
          title: '川派医方馆疼痛专家可以在线预约啦！',
          link: '/doctorlist',
          img: 'http://qpic.cn/6oICaLv7r',
          desc: '川派医方馆，专治头颈肩腰四肢关节疼痛！'
        })
      })
    }
  }
</script>

<style lang="scss">
  .wrap{
    margin: .3rem auto;
    background: #f9f9f9;
    width: 6.88rem;
    text-align: center;
    padding: 0.55rem 0;
    .title{
      color: #3f3f3f;
      font-size: 0.28rem;
      margin: 0.24rem 0 0.1rem;
    }
    .desc{
      color: #a3a3a3;
      font-size: 0.22rem;
    }
    .code{
      img{
        width: 2.2rem;
        height: 2.2rem;
        margin-bottom: .1rem;
      }
    }
  }
  .text-title{
    color: #09bb07;
    font-size: 0.26rem;
    margin-top: 0.22rem;
    text-align: center;
    display: block;
  }
</style>
