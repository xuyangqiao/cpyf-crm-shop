<template>
  <div class="container">
    <div class="wrap">
      <img :src="codeUrl" type="img" class="code"></img>
      <h2 class="title">推广二维码</h2>
      <a :href='jumpUrl' class="text-title">点击进入推广页面，将页面分享给朋友即可。</a>
      <p class="desc">长按保存，即可发布朋友圈</p>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        codeUrl: '',
        jumpUrl: ''
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        const {data: {code, data, msg}} = await api.get('/Index/Qrcode/livecode')
        if (code === 200) {
          this.codeUrl = data.img
          this.jumpUrl = data.jump_link
        } else {
          this.toast(msg)
        }
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

<style lang="scss" scoped>
  .container{
    flex: 1;
    background: #f9f9f9;
  }
  .wrap{
    text-align: center;
    .title{
      color: #3f3f3f;
      font-size: 0.28rem;
      margin: 0.24rem 0 0.1rem;
    }
    .desc{
      color: #000;
      font-size: .22rem;
      background: #f0f0f0;
      padding: 0.2rem;
      margin-top: 0.2rem;
    }
    .code{
      margin-top: 2rem;
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
