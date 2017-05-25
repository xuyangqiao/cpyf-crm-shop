<template>
  <div class="container">
    <div class="consumer-item">
      <h2 class="item-title">2017-04-01 ~ 2017-04-10</h2>
      <div class="item-content" v-for="i in 3">
        <div class="content-top">
          <div class="top-left vux-1px-r">
            <h2 class="name">李四</h2>
            <p class="client"><span class="title">业务员：</span> 刘杨</p>
          </div>
          <div class="top-right">
            <p class="price"><span class="title">总消费</span> <span class="red">5555</span>元</p>
            <p class="price"><span class="title">应结算</span> <span class="red">5555</span>元</p>
          </div>
        </div>
        <div class="content-bottom vux-1px-t">更新时间：2017-5-16 16:19</div>
      </div>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="scss">
  .consumer-item{
    .item-title{
      padding: 0 0.3rem;
      margin-top: 0.3rem;
      color: #2d2d2d;
      font-size: 0.3rem;
    }
    .item-content{
      background: #fff;
      padding: 0.3rem 0 0;
      margin-top: 0.2rem;
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
