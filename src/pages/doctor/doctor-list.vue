<template>
  <div class="container" v-infinite-scroll="fetchData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="doctor-wrap">
      <router-link :to='{path: "doctor", query: {yid: item.id}}' class="doctor-item" v-for="(item, index) in list" :key='item.id'>
        <div class="avatar">
          <img :src="item.avatar">
        </div>
        <div class="content">
          <p class="name">{{item.name}}</p>
          <p class="title">{{item.title_title}}</p>
        </div>
        <x-icon type="ios-arrow-forward" size="20"></x-icon>
      </router-link>
    </div>
    <div>
      <load-more v-if="isLoading" :show-loading="true" tip='正在加载' background-color="#e7e7e7"></load-more>
      <load-more v-if="!isLoading" :show-loading="false" tip='暂无更多数据' background-color="#e7e7e7"></load-more>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, LoadMore } from 'vux'
import api from '@/api'

export default {
  components: {
    Tab,
    TabItem,
    LoadMore
  },
  data () {
    return {
      busy: true,
      page: 0,
      isLoading: false,
      list: []
    }
  },
  computed: {
    nextPage () {
      return {
        page: this.page + 1
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.busy = true   // 禁止加载，防止重复请求
      this.isLoading = true  // 开始加载动画
      const {data: {code, data}} = await api.get('/Index/Doctor/DoctorList', this.nextPage)
      if (code === 200) {
        this.page ++
        this.list = this.list.concat(data)
        if (data.length < 20) {
          this.isLoading = false
          return
        }
        this.busy = false
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
  .doctor-item{
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.3rem;
    border-bottom: 1px solid #e7e7e7;
    &:last-child{
      border: none;
    }
    .avatar{
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
      margin-right: 0.2rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content{
      flex: 1;
      .name{
        color: #393939;
        font-size: 0.32rem;
      }
      .title{
        margin-top: 0.1rem;
        color: #a3a3a3;
        font-size: 0.24rem;
      }
    }
  }
  .doctor-header{
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
        display: none;
      }
    }
  }
</style>
