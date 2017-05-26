<template>
  <div class="container" v-infinite-scroll="fetchData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <router-link to='/newsale' tag='div' class="new-bar">
      <x-icon type="ios-plus-outline" size="20"></x-icon>
      <span class="title">添加业务员</span>
    </router-link>

    <div class="sale-section">
      <div class="sale-item" v-for="(item, index) in list">
        <div class="sale-top">
          <h2 class="name">{{item.user_nicename}}</h2>
          <p class="phone">{{item.mobile}}</p>
          <span class="status red" v-if="item.user_status === '0'">已禁用</span>
          <span class="edit" @click='editLink(item.id)'>编辑</span>
        </div>
        <div class="sale-info">
          <div class="info-item">
            <div class="info-content vux-1px-r">
              <span>客户</span>
              <strong class="bold">{{item.customer_count}}人</strong>
            </div>
          </div>
          <div class="info-item">
            <div class="info-content">
              <span>总业绩</span>
              <strong class="bold">{{item.total | totalFilter}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <load-more v-if="isLoading" :show-loading="true" tip='正在加载' background-color="#e7e7e7"></load-more>
      <load-more v-if="!isLoading" :show-loading="false" tip='暂无更多数据' background-color="#e7e7e7"></load-more>
    </div>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'
  import api from '@/api'

  export default {
    components: {
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
    filters: {
      totalFilter (num) {
        num = parseFloat(num)
        if (num >= 10000) {
          num = num / 10000 + '万'
          return num
        } else {
          return num + '元'
        }
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
        const {data: {code, data}} = await api.get('/Index/Mycenter/MySale', this.nextPage)
        if (code === 200) {
          this.page ++
          this.list = this.list.concat(data)
          if (data.length < 20) {
            this.isLoading = false
            return
          }
          this.busy = false
        }
      },
      editLink (id) {
        this.$router.push({path: 'newsale', query: { isEdit: true, sid: id }})
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
  .new-bar{
    margin-top: 0.3rem;
    background: #fff;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #2d2d2d;
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    .title{
      margin-left: 0.2rem;
    }
    .vux-x-icon{
      fill: #249b27;
    }
  }
  .sale-section{
    margin-top: 0.3rem;
    .sale-item{
      padding: 0 0.3rem;
      background: #fff;
      margin-bottom: 0.3rem;
      .sale-top{
        display: flex;
        align-items: center;
        height: 0.88rem;
        line-height: 0.88rem;
        border-bottom: 1px solid #e7e7e7;
      }
      .name{
        color: #2d2d2d;
        font-size: 0.32rem;
      }
      .phone{
        margin-left: 0.23rem;
        color: #2d2d2d;
        font-size: 0.28rem;
      }
      .status{
        margin-left: 0.23rem;
        font-size: 0.28rem;
      }
      .edit{
        flex: 1;
        text-align: right;
        color: #2d2d2d;
        font-size: 0.28rem;
      }
      .sale-info{
        display: flex;
        .info-item{
          flex: 1;
          font-size: 0.28rem;
          color: #2d2d2d;
          text-align: center;
          height: 0.88rem;
          padding: 0.18rem 0;
          box-sizing: border-box;
          .info-content{
            height: 0.52rem;
            line-height: 0.52rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
