<template>
  <div class="container" v-if="doctorInfo">
    <div class="doctor-top">
      <div class="avatar">
        <img :src="doctorInfo.avatar">
      </div>
      <div class="content">
        <h1 class="name">{{doctorInfo.name}}</h1>
        <p class="title">{{doctorInfo.title_title}}</p>
        <p class="info">{{doctorInfo.hospital_title}}</p>
        <p class="info">{{doctorInfo.profession_title}} {{doctorInfo.position_title}}</p>
        <p class="info">{{doctorInfo.degree_title}}</p>
        <p class="info">{{doctorInfo.school}}</p>
      </div>
      <div class="share" @click='shareShow=true'>
        <span class="share-icon"></span>
        <span class="text">分享</span>
      </div>
    </div>

    <!--擅长技术-->
    <div class="skill" v-if="doctorInfo">
      <h1 class="title">擅长技术</h1>
      <p class="text" :class='{hidden: doctorInfo.desc.length > 75 && !showMore}'>{{doctorInfo.desc}}</p>
      <div class="other-text" v-show="showMore">
        <h1 class="title" v-if="doctorInfo.skill">擅长技术</h1>
        <p class="text">{{doctorInfo.skill}}</p>
        <h1 class="title" v-if="doctorInfo.disease">擅长病种</h1>
        <p class="text">{{doctorInfo.disease}}</p>
        <h1 class="title" v-if="doctorInfo.work_process">工作经历</h1>
        <p class="text">{{doctorInfo.work_process}}</p>
      </div>

      <div class="open" :class='{active: showMore}' @click='showMore = !showMore'>
        <x-icon type="ios-arrow-down" size="20"></x-icon>
      </div>
    </div>

    <div class="qrcode">
      <qrcode :value="codeUrl" type="img"></qrcode>
      <h2 class="desc">长按保存医生二维码</h2>
    </div>
    
    <!--分享提示-->
    <transition name="fade" mode="out-in">
      <div class="share-mask" v-show="shareShow" @click='shareShow=false'>
        <div class="share-content">
          <span>从此处将医生分享给朋友或分享到朋友圈</span>
          <span class="share-hand"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Qrcode } from 'vux'
  import api from '@/api'

  export default {
    components: {
      Qrcode
    },
    data () {
      return {
        showMore: false,
        shareShow: false,
        doctorInfo: ''
      }
    },
    computed: {
      codeUrl () {
        return location.origin + '/?' + 'agentid=' + this.$store.state.userDefault.agentId + '&share_url=/doctor?yid=' + this.doctorInfo.id + '?'
      }
    },
    async created () {
      const {data: {code, data}} = await api.get('/Index/Doctor/DoctorDetail', {id: this.$route.query.yid})
      if (code === 200 && data) {
        this.doctorInfo = data
        this.$wechat.ready(() => {
          this.wechatShare({
            title: `川派医方馆疼痛专家${this.doctorInfo.name}`,
            link: '/doctor?yid=' + this.doctorInfo.id,
            img: `${this.doctorInfo.avatar}`,
            desc: `擅长病种：${this.doctorInfo.disease}`
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .doctor-top{
    position: relative;
    background: #fff;
    padding: 0.56rem 0.7rem 0.4rem;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #e7e7e7;
    .avatar{
      width: 1.8rem;
      height: 1.8rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .content{
      margin-left: 0.6rem;
      flex: 1;
      .name{
        font-size: 0.36rem;
        color: #2d2d2d;
      }
      .title{
        margin-top: 0.16rem;
        margin-bottom: 0.26rem;
        color: #2d2d2d;
        font-size: 0.28rem;
      }
      .info{
        margin-bottom: 0.16rem;
        color: #a3a3a3;
        font-size: 0.24rem;
      }
    }
    .share{
      position: absolute;
      top: 0.4rem;
      right: .3rem;
      font-size: 0;
      .share-icon{
        display: inline-block;
        width: 0.28rem;
        height: 0.28rem;
        background: url('../../assets/images/icon/share-icon.png') no-repeat center center;
        vertical-align: middle;
        background-size: contain;
      }
      .text{
        margin-left: 0.1rem;
        font-size: 0.28rem;
        vertical-align: middle;
      }
    }
  }
  .skill{
    position: relative;
    padding: 0.5rem 0.3rem 0.7rem;
    background: #fff;
    .title{
      color: #2d2d2d;
      font-size: 0.32rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
    .text{
      color: #2d2d2d;
      font-size: 0.28rem;
      line-height: 0.48rem;
      margin-bottom: 0.3rem;
      &.hidden{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .open{
      text-align: center;
      margin-bottom: -0.7rem;
      &.active{
        .vux-x-icon{
          transform: rotate(180deg);
        }
      }
      .vux-x-icon{
        transition: all linear .2s;
      }
    }
  }
  .qrcode{
    margin-top: 0.28rem;
    background: #fff;
    color: #2d2d2d;
    font-size: 0.28rem;
    text-align: center;
    padding: 0.47rem;
    img{
      margin-bottom: 0.26rem;
      width: 2.17rem;
      height: 2.17rem;
    }
  }
  .share-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    .share-content{
      width: 100%;
      height: 1.53rem;
      background: #fff;
      line-height: 1.53rem;
      color: #2d2d2d;
      font-size: 0.26rem;
      text-align: center;
    }
    .share-hand{
      display: inline-block;
      background: url('./../../assets/images/icon/share-hand.png') no-repeat center center;
      background-size: contain;
      width: 0.58rem;
      height: 0.72rem;
    }
  }
</style>
