<template>
  <div class="container">
    <group gutter='0' class="weui-cells_form">
      <x-input title="手机号" name='mobile' v-model="form.mobile" placeholder='请输入手机号' class="weui-vcode" :show-clear='false'></x-input>
      <x-input title="验证码" v-model="form.code" placeholder='请输入手机验证码' class="weui-vcode" :show-clear='false'>
        <x-button slot="right" mini :disabled='codeDisabled' @click.native='sendCode'>{{codeMsg}}</x-button>
      </x-input>
    </group>

    <div class="btn-wrap">
      <x-button action-type='button'>提交</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell } from 'vux'

  export default {
    components: {
      XInput,
      Group,
      XButton,
      Cell
    },
    data () {
      return {
        codeMsg: '发送验证码',
        codeDisabled: false,
        form: {
          mobile: '',
          code: ''
        }
      }
    },
    methods: {
      // 发送验证码
      sendCode () {
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if (!this.form.mobile || !myreg.test(this.form.mobile)) {
          this.toast('请输入正确的手机号')
          return
        }
        this.codeDisabled = true
        let num = 60
        let timer = setInterval(() => {
          num--
          if (num <= 0) {
            clearInterval(timer)
            this.codeMsg = '发送验证码'
            this.codeDisabled = false
            return
          }
          this.codeMsg = '重发(' + num + ')'
        }, 1000)
        // 发送验证
        // const {data: {code}} = await api.get('/Index/Apply/SendCode', {phone: this.form.mobile})
        // if (code === 200) {
        //   this.toast('发送验证码成功')
        // } else {
        //   this.toast('发送失败')
        // }
      }
    }
  }
</script>

<style lang="scss">
  .weui-btn_mini{
    box-sizing: border-box;
    min-width: 7.64em;
  }
  .btn-wrap{
    padding: 0.45rem 0.3rem;
  }
</style>
