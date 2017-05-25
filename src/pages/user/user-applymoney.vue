<template>
  <div class="container apply-bg">
    <div class="apply-top">
      <div class="company-title">
        <h2 class="title">功夫肩颈青羊店功夫肩功夫</h2>
        <p class="update-time">2017.10.20  15:30:10  更新</p>
      </div>

      <div class="money-table">
        <div class="table-head vux-1px-b">
          <div class="table-item vux-1px-r">消费客户</div>
          <div class="table-item vux-1px-r">总消费/元</div>
          <div class="table-item">应结算/元</div>
        </div>
        <div class="table-body">
          <div class="table-item vux-1px-r">23</div>
          <div class="table-item vux-1px-r">44444</div>
          <div class="table-item">578421</div>
        </div>
      </div>

      <div class="money-table">
        <div class="table-head vux-1px-b">
          <div class="table-item vux-1px-r">已提现/元</div>
          <div class="table-item vux-1px-r">待提现/元</div>
          <div class="table-item">税费及服务费/元</div>
        </div>
        <div class="table-body">
          <div class="table-item vux-1px-r">23</div>
          <div class="table-item vux-1px-r">44444</div>
          <div class="table-item">578421</div>
        </div>
      </div>

      <div class="apply-title">
        <h2 class="title">提现申请</h2>
      </div>
    </div>

    <div class="apply-form">
      <group gutter='0'>
        <x-input v-model="form.money" placeholder="请输入申请提现金额" text-align='right'>
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
      <!--开票选项-->
      <div v-if='form.open === "1"'>
        <group gutter='0'>
          <span class="title"><span class="red">*</span> 发票寄送方式：</span>
          <span class="sex-text" @click='typeShow = true'>{{typeMsg}} <span class="arr"></span></span>
        </group>
        <group gutter='0'>
          <x-input v-model="form.card_number" placeholder="请输入快递名称" text-align='right' keyboard="text">
            <div slot="label" class="label-title">
              <span>快递名称：</span>
            </div>
          </x-input>
        </group>
        <group gutter='0'>
          <x-input v-model="form.card_number" placeholder="请输入快递单号" text-align='right' keyboard="text">
            <div slot="label" class="label-title">
              <span>快递单号：</span>
            </div>
          </x-input>
        </group>
        <group gutter='0'>
          <x-textarea :max="200" placeholder="备注" :show-counter="false" :height="100" :rows="8" :cols="30"></x-textarea>
        </group>
      </div>
      <div v-else>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 代扣税款：</span>
          <span class="sex-text">{{money}}元</span>
        </group>
        <group gutter='0' class="flex-wrap">
          <span class="title"><span class="red">*</span> 实际到账：</span>
          <span class="sex-text">{{realMoney}}元</span>
        </group>
      </div>
    </div>
    <div class="btn-wrap">
      <x-button action-type='button'>申 请</x-button>
    </div>

    <div class="record">
      <div class="apply-title">
        <h2 class="title">提现记录</h2>
      </div>

      <div class="record-box">
        <div class="record-item" v-for="i in 3">
          <span class="time">2017-05-12 14:30:25</span>
          <span class="type">实际到账</span>
          <span class="type">5000元</span>
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
        openShow: false,
        typeShow: false,
        openMenu: {
          1: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">开票</span>',
          2: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">不开票</span>'
        },
        typeMenu: {
          1: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">快递</span>',
          2: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">亲自到院</span>'
        },
        form: {
          money: '',
          open: '1',
          type: '1',
          name: '',
          card: ''
        }
      }
    },
    computed: {
      openMsg () {
        if (this.form.open === '1') {
          return '开票'
        } else {
          return '不开票'
        }
      },
      typeMsg () {
        if (this.form.type === '1') {
          return '快递'
        } else {
          return '亲自到院'
        }
      },
      money () {
        if (!isNaN(this.form.money) && this.form.money) {
          return (parseFloat(this.form.money) * 0.2).toFixed(2)
        } else {
          return 0
        }
      },
      realMoney () {
        if (!isNaN(this.form.money) && this.form.money) {
          return (parseFloat(this.form.money) - parseFloat(this.form.money) * 0.2).toFixed(2)
        } else {
          return 0
        }
      }
    },
    methods: {
      openClick (key) {
        if (key !== 'cancel') {
          this.form.open = key
        }
      },
      typeClick (key) {
        if (key !== 'cancel') {
          this.form.type = key
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
    font-size: 0.26rem;
    margin-top: 0.6rem;
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
        justify-content: space-between;
        font-size: 0.26rem;
        color: #888888;
        border-bottom: 1px solid #e7e7e7;
      }
      .type{
        color: #2d2d2d;
      }
    }
  }
</style>
