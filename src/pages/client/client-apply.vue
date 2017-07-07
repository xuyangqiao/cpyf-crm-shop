<template>
  <div class="container">
    <div class="search-wrap">
      <div class="search-input">
        <group gutter='0'>
          <x-input v-model="keyword" placeholder="请输入搜索内容" :debounce='500' @on-change="searchClient" @on-focus='searchClient' @on-blur='searchBlur'></x-input>
        </group>
      </div>
      <div class="search-content" v-show="searchShow">
        <ul class="search-list">
          <li class="list-item" v-for="(item, index) in searchList" @click='selectClient(item)'>
            <p class="name" v-html='item.replace_name || item.name'></p>
            <p class="mobile" v-html='item.replace_mobile || item.mobile'></p>
          </li>
        </ul>
      </div>
    </div>
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
        <x-input v-model="form.mobile" placeholder="请输入手机号码" text-align='right' keyboard="number" is-type="china-mobile">
          <div slot="label" class="label-title">
            <span class="red">*</span>
            <span>手机号码：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <x-input v-model="form.card_number" placeholder="请输入身份证号" text-align='right'>
          <div slot="label" class="label-title">
            <span>身份证号：</span>
          </div>
        </x-input>
      </group>
      <group gutter='0'>
        <!--<popup-picker title="性 别：" :columns="1" show-name :data="sexList" v-model="sexValue"></popup-picker>-->
        <span class="title">预约类型：</span>
        <span class="sex-text" @click='applyTypeShow = true'>{{applyTypeMsg}}</span>
      </group>
      <group gutter='0'>
        <popup-picker :columns="1" :data="dateList" placeholder='选择预约时间' v-model="dateValue" @on-hide="onChangeDate">
          <template slot="title" scope="props">
            <span :class="props.labelClass" :style="props.labelStyle">
              <span class="red">*</span>
              <span>预约时间</span>
            </span>
          </template>
        </popup-picker>
      </group>
      <group gutter='0'>
        <popup-picker :columns="1" show-name :data="doctorList" placeholder='选择医生' v-model="doctorValue" @on-hide="onChangeDoctor">
          <template slot="title" scope="props">
            <span :class="props.labelClass" :style="props.labelStyle">
              <span class="red">*</span>
              <span>医生</span>
            </span>
          </template>
        </popup-picker>
      </group>
      <group gutter='0'>
        <span class="red">*</span>
        <span class="title">预约时段：</span>
        <span class="sex-text" @click='timeShow = true'>{{applyTimeMsg}}</span>
      </group>
      <group gutter='0'>
        <x-textarea title="备注：" v-model="form.desc" :height='70' autosize></x-textarea>
      </group>
    </div>

    <div class="btn-wrap">
      <x-button action-type='button' @click.native='enterApply'>提交预约</x-button>
    </div>

    <!-- 预约类型 -->
    <actionsheet v-model="applyTypeShow" :menus="applyTypeMenu" show-cancel @on-click-menu="applyTypeClick"></actionsheet>

    <!-- 预约时段 -->
    <actionsheet v-model="timeShow" :menus="timeList" show-cancel @on-click-menu="timeClick"></actionsheet>
  </div>
</template>

<script>
import { Group, XInput, PopupPicker, XButton, Actionsheet, XTextarea } from 'vux'
import api from '@/api'
export default {
  components: {
    Group,
    XInput,
    PopupPicker,
    XButton,
    Actionsheet,
    XTextarea
  },
  data () {
    return {
      form: {
        name: '',
        mobile: '',
        card_number: '',
        reserve_type: '0',
        reserves_type_id: '1',
        reserve_time: '',
        doctor_id: '',
        desc: '',
        write_type: 8
      },
      keyword: '',
      searchList: [],
      searchShow: false,
      doctorValue: [],
      doctorList: [],
      dateList: [],
      dateValue: [],
      applyTypeShow: false,
      applyTypeMenu: {
        // 1: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">首次就诊</span>',
        // 2: '<span style="display:inline-block; height: .6rem; line-height: .6rem;">复诊</span>'
      },
      workList: [],
      timeShow: false,
      timeList: [
        {
          label: '请选择您的预约时段：',
          type: 'info'
        },
        {
          label: '上午',
          type: 'primary',
          value: '1'
        },
        {
          label: '下午',
          type: 'primary',
          value: '2'
        }
      ]
    }
  },
  watch: {
    dateValue () {
      this.form.reserve_time = this.dateValue[0]
    },
    doctorValue () {
      this.form.doctor_id = this.doctorValue[0]
    }
  },
  computed: {
    applyTypeMsg () {
      if (this.form.reserves_type_id === '0') {
        return '请选择就诊类型'
      } else if (this.form.reserves_type_id === '1') {
        return '首次就诊'
      } else {
        return '复诊'
      }
    },
    applyTimeMsg () {
      if (this.form.reserve_type === '0') {
        return '请选择就诊时段'
      } else if (this.form.reserve_type === '1') {
        return '上午'
      } else {
        return '下午'
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    searchBlur () {
      setTimeout(() => {
        this.searchShow = false
      }, 300)
    },
    async searchClient () {
      this.searchShow = true
      const {data: {code, data}} = await api.get('/Index/Reserve/SearchCustomer', {keyword: this.keyword})
      if (code === 200) {
        this.searchList = data
      }
    },
    selectClient (item) {
      this.form.name = item.name
      this.form.mobile = item.mobile
      if (item.card_number) {
        this.form.card_number = item.card_number
      }
      this.searchShow = false
    },
    applyTypeClick (key) {
      if (key !== 'cancel') {
        this.form.reserves_type_id = key
      }
    },
    timeClick (key) {
      if (key === 'cancel') {
        return
      }
      const date = this.dateValue[0].replace(/-/g, '/')
      if (key === '1') {
        let maxTime = new Date(date + ' 09:30').getTime()
        let nowTime = new Date().getTime()
        if (nowTime >= maxTime) {
          this.toast('上午预约时间已截止')
          return
        }
      } else {
        let maxTime = new Date(date + ' 14:30').getTime()
        let nowTime = new Date().getTime()
        if (nowTime >= maxTime) {
          this.toast('下午预约时间已截止')
          return
        }
      }
      this.form.reserve_type = key
    },
    async fetchData () {
      const {data: {code, data}} = await api.get('/Index/Reserve/reserve')
      if (code === 200) {
        let timeArr = []
        for (let i = 0; i < data.reserves_type.length; i++) {
          this.applyTypeMenu[data.reserves_type[i].id] = '<span style="display:inline-block; height: .6rem; line-height: .6rem;">' + data.reserves_type[i].title + '</span>'
        }
        for (let i = 0; i < data.doctor_work_time.length; i++) {
          timeArr.push(data.doctor_work_time[i].doctor_work_date)
        }
        this.dateList.push(timeArr)
      }
    },
    onChangeDate () {
      this.getDoctor()
    },
    onChangeDoctor () {
      const id = this.doctorValue[0]
      this.form.reserve_type = '0'
      for (let i = 0; i < this.workList.length; i++) {
        if (this.workList[i].id === id) {
          if (this.workList[i].am === 0) {
            this.timeList[1].type = 'disabled'
            this.timeList[1].label = '上午 号满'
          } else if (this.workList[i].am < 0) {
            this.timeList[1].type = 'disabled'
            this.timeList[1].label = '未坐诊'
          } else {
            this.timeList[1].type = 'primary'
            this.timeList[1].label = '上午 仅剩' + this.workList[i].am + '个号'
          }
          if (this.workList[i].pm === 0) {
            this.timeList[2].type = 'disabled'
            this.timeList[2].label = '下午 号满'
          } else if (this.workList[i].pm < 0) {
            this.timeList[2].type = 'disabled'
            this.timeList[2].label = '未坐诊'
          } else {
            this.timeList[2].type = 'primary'
            this.timeList[2].label = '下午 仅剩' + this.workList[i].pm + '个号'
          }
        }
      }
    },
    async getDoctor () {
      const {data: {code, data}} = await api.get('/Index/Reserve/SearchDoctor', {work_time: this.dateValue[0]})
      if (code === 200) {
        this.workList = data.doctor_list
        let Arr = []
        for (let i = 0; i < data.doctor_list.length; i++) {
          Arr.push({
            name: data.doctor_list[i].name,
            value: data.doctor_list[i].id
          })
        }
        this.doctorList = Arr
        this.onChangeDoctor()
      }
    },
    async enterApply () {
      const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
      if (!this.form.name) {
        this.toast('姓名不能为空')
        return
      } else if (!this.form.mobile || !myreg.test(this.form.mobile)) {
        this.toast('请输入正确的手机号码')
        return
      } else if (!this.form.reserve_time) {
        this.toast('请选择预约时间')
        return
      } else if (!this.form.doctor_id) {
        this.toast('请选择预约医生')
        return
      } else if (this.form.reserve_type === '0') {
        this.toast('请选择预约时段')
        return
      }
      this.$vux.loading.show({
        text: '提交中'
      })
      const {data: {code, msg}} = await api.post('/Index/Reserve/ReservePost', this.form)
      if (code === 200) {
        this.$router.push('/clientapplysuccess')
      } else {
        this.toast(msg)
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
.search-wrap{
  margin-bottom: 0.2rem;
  .weui-cells{
    font-size: 0.32rem;
  }
  .search-content{
    .search-list{
      padding: 0 0.3rem;
      background: #fff;
      max-height: 6.5rem;
      overflow: auto;
      .list-item{
        color: #2d2d2d;
        border-bottom: 1px solid #f0f0f0;
        padding: 0.3rem 0;
        height: 1.3rem;
        box-sizing: border-box;
        .name{
          font-size: 0.3rem;
          margin-bottom: 0.1rem;
        }
        .mobile{
          font-size: 0.28rem
        }
      }
    }
  }
}
.client-form{
  padding: 0 0.3rem;
  background: #fff;
  .weui-cell{
    padding: 0;
  }
  .weui-cells{
    min-height: 0.88rem;
    line-height: 0.88rem;
    .sex-text{
      float: right;
      width: 8em;
      text-align: right;
    }
    .weui-textarea{
      padding: 0.2rem 0 0 0;
      line-height: 1.5em;
    }
  }
  .vux-popup-picker-placeholder{
    color: #2d2d2d;
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
}
.btn-wrap{
  padding: 0.37rem 0.3rem;
}
</style>
