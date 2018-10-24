<template>
    <div class="article-manage">
        <ArticleItem v-for="article in articleList"
                     :article="article"
                     :key="article.article_id">

        </ArticleItem>
    </div>
</template>

<script>
  import ArticleItem from './ArticleItem.vue'
  import ArticleApi from '../../api/article_api.js'
  export default {
    data() {
      return {
        articleList: [],
        currentPage: 0,
        pageScale: 10,
        maxPage: 1
      }
    },
    components: {
      ArticleItem
    },
    created() {
      this.currentPage ++
      ArticleApi.getArticleSummaryListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
        if(res.status === 200) {
          this.articleList = res.data.articleList
        }
      })
    }
  }
</script>

<style scoped lang="stylus">
  .article-manage
    width 750px

  @media(max-width: 750px){
    .article-manage {
      width 100%
    }
  }
</style>
