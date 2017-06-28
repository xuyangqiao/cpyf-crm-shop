<template>
  <div class="container">
    <div class="client-form">
      <group gutter='0'>
        <x-input v-model="form.name" placeholder="请输入患者姓名" text-align='right'>
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>姓 名：</span>
          </div>
        </x-input>
      </group>
      <div v-if="$route.query.isEdit">
        <group gutter='0'>
          <!--<popup-picker title="性 别：" :columns="1" show-name :data="sexList" v-model="sexValue"></popup-picker>-->
          <span class="title">性 别：</span>
          <span class="sex-text" @click='sexShow = true'>{{sexMsg}}</span>
        </group>
        <group gutter='0'>
          <x-input v-model="form.age" placeholder="请输入患者年龄" text-align='right' keyboard="number">
            <div slot="label" class="label-title">
              <span>年 龄：</span>
            </div>
          </x-input>
        </group>
      </div>
      <group gutter='0'>
        <x-input v-model="form.mobile" placeholder="请输入手机号码" text-align='right' :readonly='$route.query.isEdit' keyboard="number" is-type="china-mobile">
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>手机号码：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <x-input v-model="form.card_number" placeholder="请输入身份证号" :readonly='$route.query.isEdit' text-align='right' keyboard="number">
          <div slot="label" class="label-title">
            <span>身份证号：</span>
          </div>
        </x-input>
      </group>
    </div>
    <div class="btn-wrap">
      <x-button action-type='button' @click.native='enterClient'>提交</x-button>
    </div>

    <!-- 性别 -->
    <actionsheet v-model="sexShow" :menus="sexMenu" show-cancel @on-click-menu="sexClick"></actionsheet>
  </div>
</template>

<script>
  import { Group, XInput, PopupPicker, XButton, Actionsheet } from 'vux'
  import api from '@/api'
  
  export default {
    components: {
      Group,
      XInput,
      PopupPicker,
      XButton,
      Actionsheet
    },
    data () {
      return {
        value: '',
        fetchIng: false,
        sexShow: false,
        sexMenu: {
          0: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">保密</span>',
          1: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">男</span>',
          2: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">女</span>'
        },
        form: {
          name: '',
          sex: '0',
          age: '',
          mobile: '',
          card_number: ''
        }
      }
    },
    async created () {
      const {data: {code, data}} = await api.get('/Index/Write/CustomerEdit', {id: this.$route.query.cid})
      if (code === 200) {
        this.form = data
      }
    },
    computed: {
      sexMsg () {
        if (this.form.sex === '0') {
          return '保密'
        } else if (this.form.sex === '1') {
          return '男'
        } else {
          return '女'
        }
      }
    },
    methods: {
      sexClick (key) {
        if (key !== 'cancel') {
          this.form.sex = key
        }
      },
      async enterClient () {
        if (this.fetchIng) {
          return
        }
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if (this.form.name === '') {
          this.toast('请填写姓名')
          return
        } else if (!this.form.mobile || !myreg.test(this.form.mobile)) {
          this.toast('请填写手机号码')
          return
        }
        this.fetchIng = true
        let obj = this.form
        let url = '/Index/Write/AddUserinfo'
        if (this.$route.query.isEdit) {
          obj = Object.assign(obj, {id: this.$route.query.cid})
          url = '/Index/Write/CustomerEdit'
        }
        const {data: {code, msg}} = await api.post(url, obj)
        if (code === 200) {
          if (this.$route.query.isEdit) {
            this.$router.go(-1)
            return
          }
          this.$router.push('/success')
        } else {
          if (this.$route.query.isEdit) {
            this.toast(msg)
            return
          }
          this.$router.push('/fail')
        }
        this.fetchIng = false
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
.client-form{
  padding: 0 0.3rem;
  background: #fff;
  .weui-cells{
    min-height: 0.88rem;
    line-height: 0.88rem;
    .sex-text{
      float: right;
      width: 8em;
      text-align: right;
    }
  }
  .weui-cells:before{
    display: none;
  }
  .vux-cell-box:before{
    display: none;
  }
  .vux-x-input, .weui-cells{
    font-size: 0.3rem;
  }
  .weui-cell{
    padding: 0;
  }
}
.btn-wrap{
  padding: 0.37rem 0.3rem;
}
</style>
