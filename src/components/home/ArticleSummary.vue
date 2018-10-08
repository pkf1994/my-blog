<template>
    <div class="article-summary flex-column-center common-padding">
        <div class="article-title font-l cursorp" v-on:click="redirectToTheArticle">
          {{article.article_title}}
        </div>
        <div class="article-label-releasetime font-s flex-row-space-between font-dark">
          <span>{{article.article_label}}</span>
          <span>{{article.article_releaseTime}}</span>
        </div>
        <div class="article-content font-s cursorp common-line-height">{{article.article_summary}}</div>
    </div>
</template>

<script>
import getDateDiff from '../../js/getDateDiff.js'
export default {
  props: {
    article: {
      type: Object
    }
  },
  created() {
    this.formatTheDate()
  },
  methods: {
    redirectToTheArticle() {
      this.$router.push('/article/' + this.article.article_id)
    },
    formatTheDate() {
      this.article.article_releaseTime = getDateDiff.getDateDiff(new Date(this.article.article_releaseTime).getTime())
    }
  }
}
</script>

<style scoped lang="stylus">
.article-summary
  background white
  border-bottom 1px solid #F7F7F7

.article-title
.article-label-releasetime
.article-content
{
  height auto
  padding 5px 0
}

.article-title
  margin-top 10px

.article-content
  margin-bottom 10px
</style>
