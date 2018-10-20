<template>
    <div class="article common-padding flex-column-center">
      <div class="article-title font-lll font-bold">{{article.article_title}}</div>
      <div class="article-subtitle font-m font-dark">
        <span class="article-label">{{article.article_label}}</span>&nbsp;|&nbsp;作者：<span class="article-author">{{article.article_author}}</span>
      </div>
      <div class="article-content font-m common-line-height" ref="content"></div>
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
  },
  watch: {
    article() {
      this.loadArticleContent()
      this.adjustImg()
    }
  },
  methods: {
    loadArticleContent() {
      this.$refs.content.innerHTML = this.article.article_content
    },
    adjustImg() {
      let bodyEl = document.documentElement || document.body

      let imgs = document.getElementsByTagName('img')

      for(var i = 0; i < imgs.length; i++) {
        if(imgs[i].attributes['width'] == undefined){
          imgs[i].style.width = '100%'
        }

      }

      if(bodyEl.clientWidth < 750) {
        for(var i = 0; i < imgs.length; i++) {
          imgs[i].style.width = '100%'
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.article
  background white

.article-content
  overflow hidden

.article-title
.article-subtitle
.article-content
.article-releasetime
{
  height auto
  padding 5px 0
}
</style>
