<template>
  <div class="container">
    <div class="top-tips" v-show="tipShow">长按保存海报，即可在朋友圈、微信群分享推广哦~</div>
    <img :src="poster.img" class="poster-img">

    <div class="btn-wrap">
      <!--<div class="change-btn" @click='getPic(true)'>换一张</div>-->
      <x-button action-type='button' @click.native='getPic(true)' mini>换一张</x-button>
      <router-link :to='{path: "skill"}' class="skill-link">分享技巧 ></router-link>
    </div>
  </div>  
</template>

<script>
import {XButton} from 'vux'
import api from '@/api'
export default {
  components: {
    XButton
  },
  data () {
    return {
      tipShow: true,
      poster: ''
    }
  },
  created () {
    this.getPic()
  },
  methods: {
    async getPic (flag) {
      let obj = null
      if (flag) {
        obj = {
          id: this.poster.id
        }
      }
      const {data: {code, data}} = await api.get('/Index/Qrcode/WechatPoster', obj)
      if (code === 200) {
        if (data.length <= 0) {
          return
        }
        this.poster = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    position: relative;
    flex: 1;
    text-align: center;
    .top-tips{
      position: absolute;
      z-index: 100;
      top: 0;
      width: 100%;
      background: rgba(255, 255, 255, .6);
      height: 0.5rem;
      font-size: 0.22rem;
      color: #262626;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .poster-img{
    // margin: 1rem auto 0;
    width: 100%;
  }

  .btn-wrap{
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .change-btn{
      margin: 0 auto;
      width: 1.8rem;
      height: 0.7rem;
      color: #ffffff;
      font-size: 0.3rem;
      border: 1px solid #09bb07;
      border-radius: 3px;
      line-height: 0.7rem;
      text-align: center;
      background-color: #09bb07;
    }
    .skill-link{
      display: block;
      margin-top: 0.3rem;
      font-size: 0.28rem;
      padding: 0.1rem;
      color: #fff;
      background: rgba(0, 0, 0, .6);
    }
  }
</style>
