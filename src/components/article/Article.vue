<template>
    <div class="article common-padding flex-column-center">
      <div class="article-title font-lll">{{article.article_title}}</div>
      <div class="article-subtitle font-m font-dark">
        <span class="article-label">{{article.article_label}}</span>&nbsp;|&nbsp;作者：<span class="article-author">{{article.article_author}}</span>
      </div>
      <div class="article-content font-m common-line-height">{{article.article_content}}</div>
      <div class="article-releasetime font-m font-dark">发布于&nbsp;{{article.article_releaseTime}}</div>
    </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.article
  background white

.article-title
.article-subtitle
.article-content
.article-releasetime
{
  height auto
  padding 5px 0
}
</style>
