<template>
  <div class="container">
    <div class="section">
      <h1 class="title">朋友圈推广二维码</h1>
      <p class="text">点击当前页面顶部“推广二维码”，或点击下方菜单“我的”进入个人中心，点击“推广二维码”进入页面，长按二维码图片保存，发朋友圈时附上二维码即可；或制作图片宣传素材时，加上推广二维码，然后在朋友圈推广。</p>
      <router-link to='/poster' class="router-btn">前往保存二维码</router-link>
      <div class="pic-wrap">
        <img src="./../../assets/images/section-1-1.jpg" class="flex-img">
        <img src="./../../assets/images/section-1-2.jpg" class="flex-img">
      </div>
    </div>

    <div class="section">
      <h1 class="title">制作宣传物料</h1>
      <p class="text">进入推广二维码页面，将二维码图片下载下来，印刷到宣传物品上，例如糖果、纸杯子、饮料瓶、零食包装袋、抽纸盒、小扇子等。</p>
      <router-link to='/poster' class="router-btn">前往保存二维码</router-link>
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
