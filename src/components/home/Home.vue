<template>
    <div class="home flex-row-center">
      <div class="home-main-area">
        <ArticleSummary article_title="测试文章"
                        article_label="测试"
                        article_summary="浏览器中用户都是可以自定义默认的文字大小的，如果使用 px，用户自行在浏览器设置中改变了文字大小后，网页上是不会变化的。我们不能排除视障用户（如近视）、老年用户不会这么做，作为一个具有「人文关怀」的前端，我们完全可以考虑这些情况。由其是在引入了 CSS预处理工具之后，这几乎不会增加什么成本。"
                        article_releaseTime="两天前"></ArticleSummary>
      </div>
    </div>
</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
export default {
  components: {
    ArticleSummary
  }
}
</script>

<style scoped lang="stylus">
.home{
  height 100vh
  width 100vw
  .home-main-area{
    background #F7F7F7
    height 100vh
    width 900px
    padding 10px 15px
  }
}
</style>
