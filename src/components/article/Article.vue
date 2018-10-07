<template>
    <div class="article common-padding flex-column-center">
      <div class="article-title font-llll">{{article.article_title}}</div>
      <div class="article-subtitle font-m font-dark">
        <span class="article-label">{{article.article_label}}</span>|
        <span class="article-author">{{article.article_author}}</span>
      </div>
      <div class="article-content font-m">{{article.article_content}}</div>
      <div class="article-releasetime font-m font-dark">发布于{{article.article_releasetime}}</div>
    </div>
</template>

<script>
import ArticleApi from '../../api/article_api.js'
export default {
  props: {
    article_id: {
      required: true
    }
  },
  data: function() {
    return {
      article: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      ArticleApi.getArticleById(this.article_id).then((res) => {
        if (res.status === 200) {
          console.log(res)
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
