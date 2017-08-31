<template>
  <div class="container">
    <div class="user-top">
      <div class="user-msg">
        <div class="avatar">
          <img :src="data.avatar">
        </div>
        <div class="content">
          <p class="name">{{data.user_nicename}} <span class="phone">{{data.mobile}}</span></p>
        </div>
      </div>

      <div class="user-count" v-if="$store.state.userDefault.level !== 5">
        <router-link to='/not' tag='div' class="count-item vux-1px-r">
          <h2 class="title">{{data.customer_count}}位</h2>
          <p class="text">我的客户</p>
        </router-link>
        <router-link to='/already' tag='div' class="count-item vux-1px-r">
          <h2 class="title">{{data.already}}位</h2>
          <p class="text">已核算客户</p>
        </router-link>
        <!--<router-link to='/not' tag='div' class="count-item">
          <h2 class="title">3333元</h2>
          <p class="text">我的业绩</p>
        </router-link>-->
      </div>
    </div>

    <!--功能列表-->
    <div class="menu">

      <!--只有业务员显示-->
      <div class="menu-group">
        <router-link to='/not' tag='div' class="menu-item" v-if="userDefault.level === 5 && (userDefault.menu || userDefault.MenuList.customer)">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content vux-1px-b">
            <h1 class="title">我的客户</h1>
            <div class="link">
              {{data.customer_count}}位
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link>

        <!-- <router-link to='/consumer' tag='div' class="menu-item" v-if="userDefault.level !== 5">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content vux-1px-b">
            <h1 class="title">消费清单</h1>
            <div class="link">
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link>

        <router-link to='/money' tag='div' class="menu-item" v-if="userDefault.level !== 5">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content vux-1px-b">
            <h1 class="title">账户余额</h1>
            <div class="link">
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link> -->

        <router-link to='/sale' tag='div' class="menu-item" v-if="saleCheck">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content vux-1px-b">
            <h1 class="title">业务员管理</h1>
            <div class="link">
              {{data.sale_count}} 人
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link>

        <router-link to='/friend' tag='div' class="menu-item" v-if="userDefault.menu || userDefault.MenuList.friend">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content">
            <h1 class="title">关联好友</h1>
            <div class="link">
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link>
      </div>

      <div class="menu-group">
        <!--<div class="menu-item">
          <div class="icon-wrap">
            <span class="menu-icon menu-about"></span>
          </div>
          <div class="item-content">
            <h1 class="title">关于川派医方</h1>
            <div class="link">
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </div>-->
        <div>
          <a :href='url' class="menu-item">
            <div class="icon-wrap">
              <span class="menu-icon menu-recorde"></span>
            </div>
            <div class="item-content vux-1px-b">
              <h1 class="title">在线预约</h1>
              <div class="link">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </a>
        </div>
        <router-link to='/poster' tag='div' class="menu-item" v-if="userDefault.menu || userDefault.MenuList.poster">
          <div class="icon-wrap">
            <span class="menu-icon menu-recorde"></span>
          </div>
          <div class="item-content">
            <h1 class="title">推广二维码</h1>
            <div class="link">
              <x-icon type="ios-arrow-right" size="20"></x-icon>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {config} from '@/config'

  export default {
    data () {
      return {
        data: '',
        url: config.index
      }
    },
    computed: {
      saleCheck () {
        if (this.data.level < 5 && parseInt(this.data.down_level) > 1) {
          return true
        } else {
          return false
        }
      },
      userDefault () {
        return this.$store.state.userDefault
      }
    },
    async created () {
      const {data: {code, data}} = await api.get('/Index/Mycenter/MyCenter')
      if (code === 200 && data) {
        this.data = data
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
  .user-top{
    width: 100%;
    background: linear-gradient(to right, #35d036 , #09bc07);
    align-items: center;
    padding-top: 0.6rem;
    .user-msg{
      display: flex;
      padding-bottom: 0.4rem;
      position: relative;
      padding: 0 0.3rem 0.4rem;
    }
    .avatar{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content{
      position: relative;
      margin-left: 0.5rem;
      display: flex;
      flex-direction: column;
      padding: 0.2rem 0;
      justify-content: center;
      .name{
        color: #ffffff;
        font-size: 0.32rem;
        vertical-align: middle;
        .phone{
          font-size: 0.2rem;
        }
      }
      .title{
        font-size: 0.26rem;
        color: #fff;
      }
    }
    .user-count{
      display: flex;
      padding: 0.34rem 0;
      .count-item{
        flex: 1;
        text-align: center;
        color: #fff;
        &.vux-1px-r:after{
          border-right-color: #fff;
        }
        &:last-of-type:after{
          display: none;
        }
        .title{
          font-size: 0.36rem;
          margin-bottom: 0.12rem;
        }
        .text{
          font-size: 0.26rem;
        }
      }
      &:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.13);
      }
    }
  }
  .menu{
    margin-top: 0.3rem;
    .menu-group{
      margin-bottom: 0.3rem;
    }
    .menu-item{
      display: flex;
      background: #fff;
      height: 0.88rem;
      line-height: 0.88rem;
      padding-left: 0.3rem;
      .item-content{
        display: flex;
        align-items: center;
        flex: 1;
        .title{
          color: #2d2d2d;
          font-size: 0.3rem;
          flex: 1;
        }
        .link{
          color: #888888;
          font-size: 0.2rem;
          .vux-x-icon{
            fill: #3f3f3f;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
