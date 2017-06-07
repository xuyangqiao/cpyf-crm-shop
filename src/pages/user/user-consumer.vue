<template>
  <div class="container">
    <div class="consumer-item" v-for="(item, index) in filterData">
      <h2 class="item-title">{{item.time}}</h2>
      <div class="item-content" v-for="(items, index) in item.list">
        <div class="content-top">
          <div class="top-left vux-1px-r">
            <h2 class="name">{{items.name}}</h2>
            <p class="client">{{items.mobile}}</p>
          </div>
          <div class="top-right">
            <p class="price"><span class="title">消费额</span> <span class="red">{{items.total}}</span>元</p>
            <p class="price"><span class="title">应结算</span> <span class="red">{{items.paycash}}</span>元</p>
          </div>
        </div>
        <div class="content-bottom vux-1px-t">更新时间：{{items.edit_time}}</div>
      </div>
    </div>
    <div>
      <load-more v-if="info && info.length <= 0" :show-loading="false" tip='暂无数据' background-color="#e7e7e7"></load-more>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import {LoadMore} from 'vux'
export default{
  components: {
    LoadMore
  },
  data () {
    return {
      info: ''
    }
  },
  async created () {
    const {data: {code, data}} = await api.get('/Index/Total/lists')
    if (code === 200) {
      this.info = data
    }
  },
  computed: {
    filterData () {
      let arr = this.info
      let map = {}
      let dest = []
      for (let i = 0; i < arr.length; i++) {
        let ai = arr[i]
        let startTime = arr[i].start_time.split(' ')[0]
        let endTime = arr[i].end_time.split(' ')[0]
        let time = `${startTime} ~ ${endTime}`
        if (!map[ai.start_end_time]) {
          dest.push({
            time: time,
            list: [ai]
          })
          map[ai.start_end_time] = ai
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj.start_end_time === ai.start_end_time) {
              dj.list.push(ai)
              break
            }
          }
        }
      }
      return dest
    }
  }
}

</script>

<style lang="scss">
  .consumer-item{
    margin-bottom: .3rem;
    .item-title{
      padding: 0.2rem 0.3rem;
      margin-top: 0.3rem;
      color: #2d2d2d;
      font-size: 0.3rem;
      background: #f0f0f0;
    }
    .item-content{
      background: #fff;
      padding: 0.3rem 0 0;
      margin-bottom: 0.2rem;
      .content-top{
        display: flex;
        padding-bottom: 0.3rem;
        padding-left: 0.3rem;
        .top-left{
          flex: 1;
          .name{
            color: #2d2d2d;
            font-size: 0.3rem;
            margin-bottom: 0.2rem;
          }
          .client{
            font-size: 0.26rem;
            color: #2d2d2d;
            .title{
              color: #888888;
            }
          }
        }
        .top-right{
          flex: 1;
          text-align: right;
          padding-right: 0.3rem;
          .price{
            color: #2d2d2d;
            font-size: 0.26rem;
            margin-bottom: 0.2rem;
            &:last-child{
              margin: 0;
            }
            .title{
              color: #888888;
            }
          }
        }
      }
      .content-bottom{
        color: #888888;
        font-size: 0.24rem;
        height: 0.5rem;
        line-height: 0.5rem;
        padding-left: 0.3rem;
      }
    }
  }
</style>
