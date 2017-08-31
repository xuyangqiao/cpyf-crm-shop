<template>
  <div class="container apply-bg">
    <div class="apply-top">
      <div class="company-title">
        <h2 class="title">{{info.name}}</h2>
        <p class="update-time">{{info.time}} 更新</p>
      </div>

      <div class="money-table">
        <div class="table-head vux-1px-b">
          <div class="table-item vux-1px-r">消费客户</div>
          <div class="table-item vux-1px-r">总消费/元</div>
          <div class="table-item">应结算/元</div>
        </div>
        <div class="table-body">
          <div class="table-item vux-1px-r">{{info.customer_total_count}}</div>
          <div class="table-item vux-1px-r">{{info.total}}</div>
          <div class="table-item">{{info.payment}}</div>
        </div>
      </div>

      <div class="money-table">
        <div class="table-head vux-1px-b">
          <div class="table-item vux-1px-r">已提现/元</div>
          <div class="table-item vux-1px-r">待提现/元</div>
          <div class="table-item">税费/元</div>
        </div>
        <div class="table-body">
          <div class="table-item vux-1px-r">{{info.payalready}}</div>
          <div class="table-item vux-1px-r">{{info.paysure}}</div>
          <div class="table-item">{{info.paytax}}</div>
        </div>
      </div>

      <!-- <div class="apply-title">
        <h2 class="title">提现申请</h2>
      </div> -->
    </div>

    <!-- <div class="apply-form" v-if="info">
      <group gutter='0'>
        <x-input v-model.lazy="form.total" placeholder="请输入申请提现金额" text-align='right' type='number' @on-blur='changeMoney'>
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>提现额度：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <span class="title"><span class="red">*</span> 是否开票：</span>
        <span class="sex-text" @click='openShow = true'>{{openMsg}} <span class="arr"></span></span>
      </group>

      
      <div v-if='form.invoice === "1"'>
        <group gutter='0'>
          <span class="title"><span class="red">*</span> 发票寄送方式：</span>
          <span class="sex-text" @click='typeShow = true'>{{typeMsg}} <span class="arr"></span></span>
        </group>

        <div v-if="form.send_mode === '1'">
          <group gutter='0'>
            <x-input v-model="form.send_name" placeholder="请输入快递名称" text-align='right' keyboard="text">
              <div slot="label" class="label-title">
                <span>快递名称：</span>
              </div>
            </x-input>
          </group>
          <group gutter='0'>
            <x-input v-model="form.send_number" placeholder="请输入快递单号" text-align='right' keyboard="text">
              <div slot="label" class="label-title">
                <span>快递单号：</span>
              </div>
            </x-input>
          </group>
        </div>
      </div>
      <div v-if='form.invoice === "2"'>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 代扣税款：</span>
          <span class="sex-text">{{money}}元</span>
        </group>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 实际到账：</span>
          <span class="sex-text">{{realMoney}}元</span>
        </group>
      </div>
      <div v-if='form.invoice === "3"'>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 服务费：</span>
          <span class="sex-text">{{money}}元</span>
        </group>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 实际到账：</span>
          <span class="sex-text">{{realMoney}}元</span>
        </group>
      </div>
      <group gutter='0'>
        <x-textarea :max="200" v-model="form.desc" placeholder="备注" :show-counter="false" :height="100" :rows="8" :cols="30"></x-textarea>
      </group>
    </div>
    <div class="btn-wrap">
      <x-button action-type='button' @click.native='applyMoney'>申 请</x-button>
      <p class="text" v-show="form.invoice === '2'">系统将按照{{info.proportion}}%代扣税款，税后所得，心安理得。</p>
    </div> -->

    <div class="record">
      <div class="apply-title">
        <h2 class="title">提现记录</h2>
      </div>

      <div class="record-box">
        <div class="record-item" v-for="(item, index) in info.ApplyList">
          <span class="time">{{item.edit_time}}</span>
          <span class="type" v-if="item.status === '0'">申请提现</span>
          <span class="type" v-else-if="item.status === '1'">实际到账</span>
          <span class="type" v-else>已驳回</span>
          <span class="price">{{item.paycash}}元</span>
        </div>
      </div>
    </div>

    <!-- 是否开票 -->
    <actionsheet v-model="openShow" :menus="openMenu" show-cancel @on-click-menu="openClick"></actionsheet>
    <!-- 寄送开票 -->
    <actionsheet v-model="typeShow" :menus="typeMenu" show-cancel @on-click-menu="typeClick"></actionsheet>
  </div>
</template>

<script>
  import { Cell, Group, XInput, XButton, Confirm, TransferDomDirective as TransferDom, Actionsheet, XTextarea } from 'vux'
  import api from '@/api'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      XInput,
      XButton,
      Confirm,
      Cell,
      Actionsheet,
      XTextarea
    },
    data () {
      return {
        // account_type => 1 是对公
        info: '',
        openShow: false,
        typeShow: false,
        openMenu: {
          '1': '<span style="display:inline-block; height: .6rem; line-height: .6rem;">开票</span>',
          '2': '<span style="display:inline-block; height: .6rem; line-height: .6rem;">不开票</span>',
          '4': '<span style="display:inline-block; height: .6rem; line-height: .6rem;">其他</span>'
        },
        typeMenu: {
          1: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">快递</span>',
          2: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">同城配送或滴滴</span>',
          3: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">亲自到院</span>',
          4: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">其他</span>'
        },
        form: {
          total: '',
          invoice: '1',
          send_mode: '1',
          send_name: '',
          send_number: '',
          desc: ''
        }
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      openMsg () {
        if (this.form.invoice === '1') {
          return '开票'
        } else if (this.form.invoice === '2') {
          return '不开票'
        } else if (this.form.invoice === '4') {
          return '其他'
        }
      },
      typeMsg () {
        if (this.form.send_mode === '1') {
          return '快递'
        } else if (this.form.send_mode === '2') {
          return '同城配送或滴滴'
        } else if (this.form.send_mode === '3') {
          return '亲自到院'
        } else if (this.form.send_mode === '4') {
          return '其他'
        }
      },
      money () {
        let tax = this.info.proportion / 100
        // if (this.info.account_type === 1) {
        //   tax = 0.25
        //   if (!isNaN(this.form.total) && this.form.total) {
        //     return (parseFloat(this.form.total) * tax).toFixed(2)
        //   } else {
        //     return 0
        //   }
        // } else {
        //   if (this.form.invoice === '2') {
        //     tax = 0.2
        //   }
        //   if (!isNaN(this.form.total) && this.form.total) {
        //     return (parseFloat(this.form.total) * tax).toFixed(2)
        //   } else {
        //     return 0
        //   }
        // }
        if (!isNaN(this.form.total) && this.form.total) {
          return (parseFloat(this.form.total) * tax).toFixed(2)
        } else {
          return 0
        }
      },
      realMoney () {
        if (!isNaN(this.form.total) && this.form.total) {
          return (parseFloat(this.form.total) - this.money).toFixed(2)
        } else {
          return 0
        }
      }
    },
    methods: {
      changeMoney () {
        if (parseFloat(this.form.total, 10) >= this.info.paysure) {
          this.form.total = this.info.paysure
        }
      },
      openClick (key) {
        if (key !== 'cancel') {
          this.form.invoice = key
        }
      },
      typeClick (key) {
        if (key !== 'cancel') {
          this.form.send_mode = key
        }
      },
      async fetchData () {
        const {data: {code, data}} = await api.get('/Index/Apply/add')
        if (code === 200) {
          this.info = data
          this.form.total = data.paysure
          // if (data.account_type === 2) {
          //   this.openMenu['3'] = '<span style="display:inline-block; height: .6rem; line-height: .6rem;">服务费</span>'
          // }
        }
      },
      async applyMoney () {
        this.$vux.loading.show({
          text: '提交中'
        })
        const {data: {code, msg}} = await api.post('/Index/Apply/add', this.form)
        if (code === 200) {
          this.toast('申请成功')
          this.fetchData()
        } else {
          this.toast(msg)
        }
      }
    }
  }
</script>

<style lang="scss">
  .apply-bg{
    background: #e7e7e7;
    padding-bottom: 1.5rem;
  }
  .apply-top{
    padding: 0 0.3rem;
  }
  .company-title{
    padding-top: 0.53rem;
    line-height: 0.4rem;
    &:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
      clear: both;
    }
    .title{
      float: left;
      max-width: 100%;
      color: #2d2d2d;
      vertical-align: middle;
      font-size: 0.3rem;
      margin-right: 0.3rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 0.12rem;
    }
    .update-time{
      float: left;
      vertical-align: middle;
      color: #888888;
      font-size: 0.24rem;
    }
  }
  .money-table{
    margin-top: 0.3rem;
    .table-head{
      background-color: #f5f5f5;
      display: flex;
      color: #888888;
    }
    .table-body{
      background: #fff;
      display: flex;
    }
    .table-item{
      flex: 1;
      text-align: center;
      height: 0.56rem;
      line-height: 0.56rem;
      font-size: 0.26rem;
    }
  }
  .apply-title{
    color: #2d2d2d;
    font-size: 0.34rem;
    margin-top: 0.6rem;
    font-weight: bold;
  }
  .apply-form{
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    background: #fff;
    color: #000;
    .arr{
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      border-left: 0.08rem solid transparent;
      border-right: 0.08rem solid transparent;
      border-top: 0.1rem solid #000;
    }
    .flex-wrap{
      > .vux-no-group-title{
        display: flex;
      }
    }
    .weui-cells{
      min-height: 0.88rem;
      line-height: 0.88rem;
      .sex-text{
        float: right;
        width: 8em;
        text-align: right;
        flex: 1;
      }
    }
    .vux-x-input, .weui-cells{
      font-size: 0.3rem;
    }
    .weui-cell{
      padding: 0;
    }
  }
  .btn-wrap{
    padding: 0.3rem;
    .text{
      font-size: 0.26rem;
      color: #2d2d2d;
      margin-top: 0.2rem;
      text-align: center;
    }
  }
  .record{
    .apply-title{
      padding: 0 0.3rem;
    }
    .record-box{
      margin-top: 0.2rem;
      background: #fff;
      .record-item{
        padding: 0 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        display: flex;
        font-size: 0.26rem;
        color: #888888;
        border-bottom: 1px solid #e7e7e7;
      }
      .price{
        color: #2d2d2d;
        text-align: right;
        flex: 1;
      }
      .type{
        color: #2d2d2d;
        min-width: 6em;
        text-align: center;
        margin: 0 0.3rem;
      }
    }
  }
</style>
