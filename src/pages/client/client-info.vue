<template>
  <div class="container">
    <div class="client-content">
      <div class="client-msg vux-1px-b">
        <h1 class="name">{{data.name}}</h1>
        <span class="mobile">{{data.mobile}}</span>
        <span class="card" v-if="data.card_number">{{ data.card_number | cardFilter }}</span>
      </div>
      <div class="client-sale">
        <div class="sale-item">
          <span class="sale">业务员：{{data.sale_name}}</span>
          <span class="sale price">消费总计：<span class="red">{{data.total}}</span>元</span>
        </div>
        <div class="sale-item">
          <span class="sale-time">添加：{{data.customer_time}}</span>
        </div>
      </div>
    </div>

    <!--就诊详情-->
    <!--<div class="clinic-section">
      <div class="clinic" v-for="(item, index) in data.customer_list">
        <div class="time">
          <h2 class="time-number">{{index | numberToChinese}}次就诊</h2>
          <p class="date">{{item.create_time}}</p>
        </div>
        <div class="person" v-if="item.sale_name !== ''">业务员：{{item.sale_name}}</div>
        <div class="consume">消费：{{item.total}}</div>
      </div>
    </div>-->

    <div class="btn-wrap">
      <div class="delete-btn" @click='deleteShow = true'>删除患者信息</div>
    </div>

    <div v-transfer-dom>
      <confirm class="deleteMask" v-model="deleteShow" title="确认删除患者信息吗？" @on-confirm="sureDelete">
        <p style="text-align:center; margin-top: 0.2rem;">删除后将无法恢复！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
import { numberToChinese } from '@/utils'
import api from '@/api'

export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm
  },
  filters: {
    numberToChinese (num) {
      return numberToChinese(num)
    },
    cardFilter (card) {
      let temp = []
      card = card + ''
      for (let i = 0; i < card.length; i++) {
        if (i < 3 || i > 13) {
          temp.push(card[i])
        } else {
          temp.push('*')
        }
      }
      return temp.join('')
    }
  },
  data () {
    return {
      deleteShow: false,
      data: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async sureDelete () {
      const {data: {code}} = await api.get('/Index/Write/CustomerDel', {id: this.$route.query.cid})
      if (code === 200) {
        this.toast('删除成功')
        this.$router.replace('/not')
      }
    },
    async fetchData () {
      const {data: {code, data}} = await api.get('/Index/Write/CustomerDetails', {id: this.$route.query.cid})
      if (code === 200 && data) {
        this.data = data
      }
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
  .top-bar{
    height: 2.2rem;
    padding-top: 0.74rem;
    box-sizing: border-box;
    background-color: #09bb07;
    .info-list{
      display: flex;
      color: #fff;
      align-items: center;
      .info-item{
        flex: 1;
        text-align: center;
        border-right: 1px solid #0d9f0b;
        &:last-child{
          border: none;
        }
        .name{
          font-size: 0.36rem;
          font-weight: bold;
        }
        .desc{
          font-size: 0.24rem;
          margin-top: 0.17rem;
        }
      }
    }
    .card{
      text-align: center;
      color: #fff;
      font-size: 0.2rem;
      margin: 0.3rem 0 0 0;
    }
  }
  .client-content{
    padding: 0.76rem 0.3rem 0.36rem;
    background: #fff;
    .client-msg{
      display: flex;
      align-items: flex-end;
      color: #2d2d2d;
      padding-bottom: 0.3rem;
      .name{
        font-weight: 800;
        font-size: 0.36rem;
      }
      .mobile{
        font-size: 0.3rem;
        margin-left: 0.3rem;
      }
      .card{
        text-align: right;
        flex: 1;
        font-size: 0.24rem;
      }
    }
    .client-sale{
      padding-top: 0.35rem;
      .sale-item{
        display: flex;
        .sale{
          flex: 1;
          font-size: 0.28rem;
          color: #888888;
          margin-bottom: 0.25rem;
          &.price{
            text-align: right;
          }
        }
        .sale-time{
          font-size: 0.24rem;
          color: #888888;
        }
      }
    }
  }

  .clinic-section{
    margin-top: 0.3rem;
    background: #fff;
    padding: 0 0.3rem;
    .clinic{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.14rem;
      border-bottom: 1px solid #e7e7e7;
      &:last-child{
        border: none;
      }
      .time{
        text-align: center;
        .time-number{
          font-size: 0.28rem;
          color: #2d2d2d;
        }
        .date{
          margin-top: 0.18rem;
          font-size: 0.24rem;
          color: #888888;
        }
      }
      .person{
        color: #2d2d2d;
        font-size: 0.24rem;
      }
      .consume{
        color: #2d2d2d;
        font-size: 0.24rem;
      }
    }
  }

  .btn-wrap{
    padding: 0.3rem;
    .delete-btn{
      height: 0.88rem;
      border-radius: 3px;
      border: 1px solid #e34e4c;
      background-color: #f76260;
      color: #ffffff;
      font-size: 0.36rem;
      line-height: 0.88rem;
      text-align: center;
    }
  }
  .deleteMask{
    .weui-dialog__hd{
      padding: 0;
    }
  }
</style>
