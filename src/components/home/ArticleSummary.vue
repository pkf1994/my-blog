<template>
    <div class="article-summary">
      <div class="article-title font-l">{{article.article_title}}</div>
      <div class="article-label-releasetime font-s flex-row-space-between font-dark">
        <span>{{article.article_label}}</span>
        <span>{{article.article_releaseTime}}</span>
      </div>
      <div class="article-content font-s">{{article.article_summary}}</div>
      <div class="division"></div>
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
    this.article.article_releaseTime = getDateDiff.getDateDiff(new Date(this.article.article_releaseTime).getTime())
  }
}
</script>

<style scoped lang="stylus">
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
