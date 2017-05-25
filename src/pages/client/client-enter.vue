<template>
  <div class="container">
    <div class="client-form">
      <group gutter='0'>
        <x-input v-model="form.name" placeholder="请输入客户姓名" text-align='right'>
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>姓 名：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <popup-picker title="性 别：" :columns="1" show-name :data="sexList" v-model="sexValue"></popup-picker>
      </group>
      <group gutter='0'>
        <x-input v-model="form.age" placeholder="请输入客户年龄" text-align='right' keyboard="number">
          <div slot="label" class="label-title">
            <span>年 龄：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <x-input v-model="form.mobile" placeholder="请输入手机号码" text-align='right' keyboard="number" is-type="china-mobile">
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>手机号码：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <x-input v-model="form.card_number" placeholder="请输入身份证号" text-align='right' keyboard="number">
          <div slot="label" class="label-title">
            <span>身份证号：</span>
          </div>
        </x-input>
      </group>
    </div>
    <div class="btn-wrap">
      <x-button action-type='button' @click.native='enterClient'>提交</x-button>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, PopupPicker, XButton } from 'vux'
  import api from '@/api'
  
  export default {
    components: {
      Group,
      XInput,
      PopupPicker,
      XButton
    },
    data () {
      return {
        value: '',
        sexValue: ['0'],
        fetchIng: false,
        sexList: [
          {
            name: '男',
            value: '1',
            parent: 0
          },
          {
            name: '女',
            value: '2',
            parent: 0
          }
        ],
        form: {
          name: '',
          sex: '',
          age: '',
          mobile: '',
          card_number: ''
        }
      }
    },
    watch: {
      sexValue () {
        this.form.sex = this.sexValue[0]
      }
    },
    methods: {
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
        const {data: {code}} = await api.post('/Index/Write/AddUserinfo', this.form)
        if (code === 200) {
          this.$router.push('/success')
        } else {
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
  margin-top: 0.3rem;
  padding: 0 0.3rem;
  background: #fff;
  .weui-cells{
    height: 0.88rem;
    line-height: 0.88rem;
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
