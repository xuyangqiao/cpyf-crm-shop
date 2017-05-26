<template>
  <div class="client-item">
    <router-link :to='{path: "detail", query: {cid: item.id}}' class="item-content vux-1px-b">
      <div class="name">{{item.name}}</div>
      <div class="phone">{{item.mobile}}</div>
      <div class="type already" v-if="item.reserve_status === 3">{{filterMoney}}</div>
      <x-icon type="ios-arrow-right" size="20"></x-icon>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    computed: {
      filterMoney () {
        if (this.item.reserve_status === 3 && !this.item.total) {
          return '待核算'
        } else {
          return this.item.total + '元'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .client-item{
    height: 0.88rem;
    background: #fff;
    line-height: 0.88rem;
    padding: 0 0.3rem;
    .item-content{
      display: flex;
      align-items: center;
      .name{
        min-width: 8em;
        color: #2d2d2d;
        font-size: 0.3rem;
      }
      .phone{
        flex: 1;
        color: #2d2d2d;
        font-size: 0.24rem;
      }
      .type{
        margin-right: 0.62rem;
        color: #a3a3a3;
        font-size: 0.24rem;
        &.already{
          color: #000;
        }
      }
    }
  }
</style>
