<template>
  <div class="container">
    <div class="section">
      <h1 class="title">海报推广</h1>
      <p class="text">点击底部导航“分享”进入分享海报界面，长按保存海报（点击绿色按钮“换一张”可以更换海报背景），发送到微信群和朋友圈等社交平台进行宣传。</p>
      <router-link to='/poster' class="router-btn">前往保存海报</router-link>
      <div class="pic-wrap">
        <img src="./../../assets/images/section-1-1.jpg" class="flex-img">
        <img src="./../../assets/images/section-1-2.jpg" class="flex-img">
      </div>
    </div>

    <div class="section">
      <h1 class="title">制作宣传单</h1>
      <p class="text">将海报制作成宣传单，贴到社区宣传栏，或者在人流量比较集中的地方发放。</p>
      <router-link to='/poster' class="router-btn">前往保存海报</router-link>
      <div class="pic-wrap">
        <img src="./../../assets/images/section-1-1.jpg" class="flex-img">
        <img src="./../../assets/images/section-1-2.jpg" class="flex-img">
      </div>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
.container{
  flex: 1;
  background: #f9f9f9;
  .section{
    padding: 0.6rem 0.3rem;
    .title{
      font-size: 0.4rem;
      color: #000;
      font-weight: bolder;
    }
    .text{
      margin-top: 0.36rem;
      font-size: 0.26rem;
      color: #3f3f3f;
      line-height: 0.44rem;
    }
    .router-btn{
      display: block;
      margin: 0.48rem 0 0.34rem;
      background: #09bb07;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 4px;
    }
    .pic-wrap{
      font-size: 0;
      .flex-img{
        width: 3.36rem;
        margin-right: 0.1rem;
        &:last-child{
          margin: 0;
        }
      }
    }
  }
}
</style>
