<template>
    <div class="article-summary">
      <div class="article-title font-l">{{article_title}}</div>
      <div class="article-label-releasetime font-s flex-row-space-between font-dark">
        <span>{{article_label}}</span>
        <span>{{article_releaseTime}}</span>
      </div>
      <div class="article-content font-m">{{article_summary}}</div>
    </div>
</template>

<script>
export default {
  props: {
    article_title: {
      type: String,
      default: ''
    },
    article_label: {
      type: String,
      default: ''
    },
    article_summary: {
      type: String,
      default: ''
    },
    article_releaseTime: {
      type: String,
      default: ''
    }

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
</style>
