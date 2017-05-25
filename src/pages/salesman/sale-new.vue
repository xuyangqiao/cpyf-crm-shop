<template>
  <div class="container">
    <div class="client-form">
      <group gutter='0'>
        <x-input v-model="form.name" placeholder="请输入真实姓名" text-align='right'>
          <div slot="label" class="label-title">
            <span>姓 名：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <x-input v-model="form.mobile" :readonly='editFlag' placeholder="请输入手机号码" text-align='right' keyboard="number" is-type="china-mobile">
          <div slot="label" class="label-title">
            <span>手机号码：</span>
          </div>
        </x-input>
      </group>
      <!--<group gutter='0'>
        <popup-picker title="提成比例：" :data="propList" v-model="propValue"></popup-picker>
      </group>
      <group gutter='0' class="time-wrap">
        <datetime v-model="form.start_time" title="合作开始时间：" :min-year='2000' :max-year='2018' clear-text="开始时间" confirm-text="确认" cancel-text="取消"></datetime>
      </group>
      <group gutter='0' class="time-wrap">
        <datetime v-model="form.end_time" title="合作结束时间：" :min-year='2000' :max-year='2018' clear-text="结束时间" confirm-text="确认" cancel-text="取消"></datetime>
      </group>-->
    </div>
    <div class="btn-wrap">
      <x-button action-type='button' @click.native='newSale' v-if="!$route.query.isEdit">提交</x-button>
      <x-button action-type='button' @click.native='editSale' v-else>提交</x-button>
    </div>
    
    <div class="delete-sale" v-if="$route.query.isEdit">
      <span class="delete-text" @click='stopShow = true' v-if="status === '1'">禁用</span>
      <span class="delete-text" @click='startShow = true' v-else>启用</span>
    </div>

    <div v-transfer-dom>
      <confirm class="deleteMask" v-model="stopShow" title="确定禁用该业务员吗？" @on-confirm="sureStop"></confirm>
    </div>
    <div v-transfer-dom>
      <confirm class="deleteMask" v-model="startShow" title="确定启用该业务员吗？" @on-confirm="surestart"></confirm>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, PopupPicker, XButton, Datetime, Confirm, TransferDomDirective as TransferDom } from 'vux'
  // import { handleDay } from '@/utils'
  import api from '@/api'
  
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      XInput,
      PopupPicker,
      XButton,
      Datetime,
      Confirm
    },
    data () {
      return {
        value: '',
        propValue: [],
        propList: [[]],
        timeList: [[]],
        timeValue: '',
        time: '',
        editId: '',
        status: '',
        stopShow: false,
        startShow: false,
        form: {
          name: '',
          mobile: ''
          // proportion: '',
          // start_time: '',
          // end_time: ''
        }
      }
    },
    computed: {
      editFlag () {
        if (this.$route.query.isEdit) {
          return true
        } else {
          return false
        }
      }
    },
    // watch: {
    //   timeValue (val) {
    //     if (val.length <= 0) return
    //     let maxTime = parseInt(val)
    //     let start = handleDay()
    //     let end = handleDay(null, 365 * maxTime)
    //     this.time = start + ' ~ ' + end
    //     this.form.start_time = start
    //     this.form.end_time = end
    //   },
    //   propValue (val) {
    //     this.form.proportion = parseFloat(this.propValue[0])
    //   }
    // },
    created () {
      // let start = handleDay()
      // let end = handleDay(null, 365)
      // this.form.time = start + ' ~ ' + end
      // for (let i = 1; i < 100; i++) {
      //   this.propList[0].push(i + '%')
      //   this.timeList[0].push(i + '年')
      // }
      if (this.$route.query.isEdit) {
        this.fetchEdit()
      }
    },
    methods: {
      async newSale () {
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if (this.form.name === '') {
          this.toast('请填写姓名')
          return
        } else if (!this.form.mobile || !myreg.test(this.form.mobile)) {
          this.toast('请填写手机号码')
          return
        }
        // else if (!this.form.start_time || !this.form.end_time) {
        //   this.toast('请选择合作时间')
        //   return
        // } else if (!this.form.proportion) {
        //   this.toast('请选择提成比例')
        //   return
        // }
        const {data: {code, msg}} = await api.post('/Index/Mycenter/AddCustomer', this.form)
        if (code === 200) {
          this.toast('添加成功')
          this.$router.push('/sale')
        } else {
          this.toast(msg)
        }
      },
      async fetchEdit () {
        const {data: {code, data}} = await api.get('/Index/Mycenter/EditCustomer', {id: this.$route.query.sid})
        if (code === 200 && data) {
          this.form.name = data.name
          this.form.mobile = data.mobile
          // this.propValue.push(data.proportion + '%')
          // this.form.start_time = data.start_time
          // this.form.end_time = data.end_time
          this.editId = data.id
          this.status = data.user_status
        }
      },
      async editSale () {
        const option = Object.assign(this.form, {id: this.editId})
        const {data: {code, msg}} = await api.post('/Index/Mycenter/EditCustomer', option)
        if (code === 200) {
          this.toast('编辑成功')
          this.$router.push('/sale')
        } else {
          this.toast(msg)
        }
      },
      async sureStop () {
        const {data: {code}} = await api.get('/Index/Mycenter/disable', {uid: this.$route.query.sid})
        if (code === 200) {
          this.toast('禁用成功')
          this.$router.go(-1)
        }
      },
      async surestart () {
        const {data: {code}} = await api.get('/Index/Mycenter/enable', {uid: this.$route.query.sid})
        if (code === 200) {
          this.toast('启用成功')
          this.$router.go(-1)
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
  .time-wrap{
    position: relative;
    .vux-popup-picker-select-box{
      z-index: 1;
    }
    .vux-popup-picker-value{
      visibility: hidden;
    }
    .time-text{
      position: absolute;
      right: 12px;
      top: 0;
      z-index: 0;
    }
  }
}
.btn-wrap{
  padding: 0.37rem 0.3rem;
}

.delete-sale{
  text-align: center;
  .delete-text{
    display: inline-block;
    text-decoration: underline;
    font-size: 0.36rem;
    color: #2d2d2d;
  }
}

.deleteMask{
  .weui-dialog__hd{
    padding: 0;
  }
}
</style>
