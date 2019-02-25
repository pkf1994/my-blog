<template>
    <div class="article common-padding">
      <div class="article-title font-ll font-bold">{{article.article_title}}</div>
      <div class="article-subtitle font-s font-dark flex-row-space-between">
        <div>
          <span class="article-label clickable cursorp" @click="submitArticleLabel">{{article.article_label}}</span>&nbsp;|&nbsp;作者：<span class="article-author">{{article.article_author}}</span>
        </div>
        <Share :pic-url="article.article_previewImageUrl"
               :shareTitle="shareTitle"
        ></Share>
      </div>
      <div class="article-content font-s common-line-height" ref="content"></div>
      <div class="article-releasetime font-s font-dark">发布于&nbsp;{{article.article_releaseTime}}</div>
    </div>
</template>

<script>
import Share from '../share/Share.vue'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    shareTitle() {
      return "我正在阅读文章“" + this.article.article_title + "”，出自“彭凯帆的博客”。  -- "
    }
  },
  mounted() {

  },
  watch: {
    article() {
      this.loadArticleContent()
      this.adjustImg()
      this.initTitle()
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
    },
    submitArticleLabel() {
      this.$router.push({path:'/article_manage', query: {article_label: this.article.article_label}})
    },
    initTitle() {
      document.title = this.article.article_title
    }
  },
  components: {
    Share
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
