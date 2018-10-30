<template>
    <div class="article-summary">
        <div class="article-title font-l cursorp font-bold" v-on:click="redirectToTheArticle">
          {{article.article_title}}
        </div>
        <div class="article-label-releasetime font-m flex-row-space-between font-dark">
          <span>{{article.article_label}}</span>
          <span>{{article.article_releaseTime}}</span>
        </div>
        <div class="article-content font-m cursorp common-line-height flex-row-center">
          <div class="article-content-summary" ref="summary" v-on:click="redirectToTheArticle">{{article.article_summary}}
            <span class="readAll">
              <span class="summary-cover"></span>
              <span class="font-m" style="background: white" v-on:click="redirectToTheArticle">阅读全文</span>
            </span></div>

            <div ref="imgInner" class="img-inner" v-if="article.article_previewImageUrl != undefined" v-on:click="redirectToTheArticle">
              <img ref="img" :src="article.article_previewImageUrl" alt="previewImage" class="preview-image">
            </div>

        </div>
    </div>
</template>

<script>
import getDateDiff from '../../js/getDateDiff.js'
import { mapActions } from 'vuex'
export default {
  props: {
    article: {
      type: Object
    }
  },
  created() {
    this.formatTheDate()
  },
  mounted() {
      this.handlePreviewImageSize()
      this.handleArticleContentSummarySize()
  },
  methods: {
    ...mapActions([
      'appointIdOfArticleBeingReading'
    ]),
    redirectToTheArticle() {
      this.appointIdOfArticleBeingReading(this.article.article_id)
      this.$router.push('/article/' + this.article.article_id)
    },
    formatTheDate() {
      this.article.article_releaseTime = getDateDiff.getDateDiff(new Date(this.article.article_releaseTime).getTime())
    },
    handlePreviewImageSize() {
      let bodyEl = document.body || document.documentElement
      let offsetWidthOfBodyEl = bodyEl.offsetWidth
      if(offsetWidthOfBodyEl > 750) {
        return
      }
      if(this.article.article_previewImageUrl != undefined){
        setTimeout(() => {
          let imgHeight = parseInt(getComputedStyle(this.$refs.img).height)
          let imgInnerHeight = parseInt(getComputedStyle(this.$refs.imgInner).height)
          let imgMarginTop = (imgInnerHeight - imgHeight) * 0.5
          this.$refs.img.style.top = imgMarginTop + 'px'
        },1000)
      }
    },
    handleArticleContentSummarySize() {
      let bodyEl = document.body || document.documentElement
      let offsetWidthOfBodyEl = bodyEl.offsetWidth
      if(offsetWidthOfBodyEl > 750) {
        let lineHeight = parseInt(getComputedStyle(this.$refs.summary).lineHeight)
        this.$refs.summary.style.height = lineHeight * 4 + 'px'
        if(this.article.article_previewImageUrl != undefined){
          this.$refs.img.style.height = lineHeight * 4 + 'px'
        }
      }
      if(offsetWidthOfBodyEl <= 750) {
        let lineHeight = parseInt(getComputedStyle(this.$refs.summary).lineHeight)
        this.$refs.summary.style.height = lineHeight * 3 + 'px'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.article-summary
  width 100%
  background white
  border-bottom 1px solid #F7F7F7

.article-title
.article-label-releasetime
.article-content
{
  height auto
  word-wrap break-word
}

.article-title
  margin-top 10px

.article-content
  margin-bottom 10px
  overflow hidden


.preview-image
  width: auto
  height 150px
  border-radius 4px

@media (min-width: 750px){
  .preview-image{
    margin-left 20px
  }
}

@media (max-width: 750px){
  .article-summary{
    width 100%
  }
  .article-content{
    display flex
    flex-direction column
  }
  .article-content-summary{
    height 5rem
    order 2
  }
  .img-inner{
    position relative
    width 100%
    height 150px
    overflow hidden
    margin-top  5px
    margin-bottom 10px
    border-radius 4px

  }
  .preview-image{
    position absolute
    width 100%
    height auto
    order 1
  }
}
.article-content-summary
  height 10rem
  overflow hidden
  position relative

.readAll
  z-index 0
  display flex
  position absolute
  bottom 0
  right 0
  float right
  color rgb(23, 81, 153)

.readAll:hover
  color black

.summary-cover
  height 2rem
  width 8rem
  background linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))
</style>
