<template>
  <div class="container" v-infinite-scroll="fetchData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="top-bar">
      <div class="top-left">
        <span class="title-item">好友：54人</span>
        <span class="title-item">推荐：12人</span>
      </div>
      <div class="top-right">全部好友 <x-icon type="ios-arrow-down" size="20"></x-icon></div>
    </div>
    <!--<div class="friend-list">
      <div class="friend-item" v-for="i in 3">
        <div class="avatar">
          <img src="">
        </div>
        <div class="friend-content">
          <div class="name-line">
            <span class="name">张三丰</span>
            <span class="up">推荐32人</span>
          </div>
          <div class="time-line">2017.06.26  13：21：40</div>
        </div>
        <div class="friend-btn">
          <div class="attention">+ 关注</div>
          <div class="attention active">已关注</div>
        </div>
      </div>
    </div>-->
    <div v-if="list.length > 0">
      <load-more v-if="isLoading" :show-loading="true" tip='正在加载' background-color="#e7e7e7"></load-more>
      <load-more v-if="!isLoading" :show-loading="false" tip='暂无更多数据' background-color="#e7e7e7"></load-more>
    </div>
    <div class="no-friend" v-if="list.length <= 0">
      <img src="../../assets/images/no-friend.png">
      <p class="title">您还没有关联好友哦~</p>
    </div>
  </div>
</template>

<script>
import { LoadMore } from 'vux'

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
    fetchData () {
      console.log(1111)
    }
  }
}
</script>

<style lang="scss">
  .top-bar{
    display: flex;
    height: 0.72rem;
    background: #fff;
    line-height: 0.72rem;
    font-size: 0.22rem;
    color: #393939;
    padding: 0 0.3rem;
    border-bottom: 1px solid #e5e5e5;
    .top-left{
      flex: 1;
    }
    .top-right{
      font-size: 0.26rem;
      display: flex;
      align-items: center;
    }
    .title-item{
      margin-right: 0.4rem;
    }
  }
  .friend-list{
    background: #fff;
    .friend-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      border-bottom: 1px solid #e5e5e5;
      .avatar{
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .friend-content{
        flex: 1;
        margin-left: 0.2rem;
        font-size: 0.32rem;
        color: #393939;
        .name-line{
          margin-bottom: 0.14rem;
        }
        .time-line{
          color: #a3a3a3;
          font-size: 0.2rem;
        }
        .up{
          font-size: 0.26rem;
          margin-left: 0.6rem;
        }
      }
    }
    .friend-btn{
      .attention{
        width: 1.2rem;
        height: 0.46rem;
        border-radius: 4px;
        background-color: #09bb07;
        color: #fff;
        text-align: center;
        line-height: 0.46rem;
        font-size: 0.26rem;
        border: 1px solid #09bb07;
        &.active{
          background: none;
          border-color: #393939;
          color: #393939;
        }
      }
    }
  }
  .no-friend{
    margin-top: 3.78rem;
    text-align: center;
    .title{
      color: #393939;
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
</style>
