<template>
    <div class="home flex-row-center">
      <div class="home-main-area">
        <div class="article-summary-content">
          <ArticleSummary v-for="article in articleSummaryList"
                          :key="article.article_id"
                          :article=article
          ></ArticleSummary>
        </div>
      </div>
    </div>
</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
import axios from 'axios'
export default {
  data: function() {
    return {
      currentPage: 1,
      pageScale: 5,
      maxPage: 1,
      articleSummaryList: []
    }
  },
  components: {
    ArticleSummary
  },
  created() {
    var _this = this
    axios.get('http://localhost:8088/pengblog-api/article/article_summary.do', {params: {currentPage: this.currentPage, pageScale: this.pageScale}}).then(function (res) {
      _this.maxPage = res.data.maxPage
      _this.articleSummaryList = res.data.articleList
    })
  }
}
</script>

<style scoped lang="stylus">
.home {
  width 100vw
  .home-main-area {
    background #F7F7F7
    height auto
    width 750px
    padding 10px 30px
    display flex
  }
}

@media(max-width: 750px){
.home-main-area{
  width 100vw
  flex-direction column
  }
}
</style>
