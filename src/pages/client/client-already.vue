<template>
  <div class="client-section">
    <client-item v-for="(item, index) in list" :key='item.id' :item='item'></client-item>
    <div>
      <load-more v-if="isLoading" :show-loading="true" tip='正在加载' background-color="#e7e7e7"></load-more>
      <load-more v-if="!isLoading" :show-loading="false" tip='暂无更多数据' background-color="#e7e7e7"></load-more>
    </div>
  </div>
</template>

<script>
  import clientItem from '@/components/client-item.vue'
  import { LoadMore } from 'vux'
  import api from '@/api'

  export default {
    components: {
      clientItem,
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
      async fetchData () {
        this.busy = true   // 禁止加载，防止重复请求
        this.isLoading = true  // 开始加载动画
        const {data: {code, data}} = await api.get('/Index/Write/FinanceUser', this.page)
        if (code === 200) {
          this.page ++
          this.list = this.list.concat(data)
          if (data.length < 20) {
            this.isLoading = false
            return
          }
          this.busy = false
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

</style>
