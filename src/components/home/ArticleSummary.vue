<template>
  <div style="width: 100%">
    <div class="gap-mobile"></div>
    <div class="article-summary common-padding" >
      <div class="article-summary-title font-m cursorp font-bold" v-on:click="redirectToTheArticle">
        {{article.article_title}}
      </div>
      <div class="article-summary-info-content-previewimg flex-row-center" >
        <div class="article-summary-info-content" ref="articleSummaryInfoContent">
          <div class="article-summary-info font-s flex-row-space-between font-dark">
            <span class="article-summary-info-left">
              <span class="article-summary-label cursorp" @click="submitArticleLabel">[{{article.article_label}}]</span>&nbsp;&nbsp;|&nbsp;
              作者: {{article.article_author}}&nbsp;&nbsp;|&nbsp;
              <span class="cursorp" @click="goToTheCommentEditor">评论</span><span class="article-summary-comment cursorp" @click="goToTheCommentList" v-if="countOfComment!=0">:&nbsp;{{countOfComment}}&nbsp;&nbsp;</span>
            </span>
            <span class="article-summary-info-right">发布于:{{article.article_releaseTime}}</span>
          </div>
          <div ref="imgInnerMobile" class="article-summary-previewimg-inner-mobile" v-if="article.article_previewImageUrl != undefined && isMobile" v-on:click="redirectToTheArticle">
            <img ref="imgMobile" :id="'img_' + article.article_id" :src="article.article_previewImageUrl" alt="previewImage" class="article-summary-previewimage-mobile">
          </div>
          <div class="article-summary-content font-s cursorp" ref="summary" v-on:click="redirectToTheArticle">
            {{article.article_summary}}
            <span class="readAll">
              <span class="summary-cover"></span>
              <span class="font-s cursorp" style="background: white" v-on:click="redirectToTheArticle">阅读全文</span>
              </span>
          </div>
        </div>
        <div ref="imgInner" class="article-summary-previewimg-inner" v-if="article.article_previewImageUrl != undefined && !isMobile" v-on:click="redirectToTheArticle">
          <img ref="img" v-on:click="redirectToTheArticle" :src="article.article_previewImageUrl" alt="previewImage" class="article-summary-previewimage cursorp">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import getDateDiff from '../../js/getDateDiff.js'
import { mapActions,mapState } from 'vuex'
import CommentApi from '../../api/comment_api.js'
export default {
  props: {
    article: {
      type: Object
    }
  },
  data() {
    return {
      countOfComment: 0
    }
  },
  inject:['isMobile'],
  computed: {
    ...mapState([
      'scrollTopOfDocumentEl'
    ])
  },
  created() {
    this.formatTheDate()
    this.getCountOfComment()
  },
  mounted() {
      this.handlePreviewImageMobileSize()
      this.handleArticleContentSummarySize()
  },
  methods: {
    ...mapActions([
      'appointIdOfArticleBeingReading'
    ]),
    redirectToTheArticle() {
      this.appointIdOfArticleBeingReading(this.article.article_id)
      this.$router.push({path: '/routine/article/' + this.article.article_id, query:{body_scroll_top: parseInt(this.scrollTopOfDocumentEl)}})
    },
    formatTheDate() {
      this.article.article_releaseTime = getDateDiff.getDateDiff(new Date(this.article.article_releaseTime).getTime())
    },
    handlePreviewImageMobileSize() {
      let bodyEl = document.body || document.documentElement
      let offsetWidthOfBodyEl = bodyEl.offsetWidth
      if(offsetWidthOfBodyEl > 750) {
        return
      }
      if(this.article.article_previewImageUrl != undefined){
        document.getElementById('img_' + this.article.article_id).addEventListener('load', () => {
          let imgHeight = parseInt(getComputedStyle(this.$refs.imgMobile).height)
          let imgInnerHeight = parseInt(getComputedStyle(this.$refs.imgInnerMobile).height)
          let imgMarginTop = (imgInnerHeight - imgHeight) * 0.5
          this.$refs.imgMobile.style.top = imgMarginTop + 'px'
        })
      }
    },
    handleArticleContentSummarySize() {
      let bodyEl = document.body || document.documentElement
      let offsetWidthOfBodyEl = bodyEl.offsetWidth
      if(offsetWidthOfBodyEl > 750) {
        let lineHeight = parseInt(getComputedStyle(this.$refs.summary).lineHeight)
        this.$refs.summary.style.height = lineHeight * 3 + 'px'
        if(this.article.article_previewImageUrl != undefined){
          this.$refs.img.style.height = getComputedStyle(this.$refs.articleSummaryInfoContent).height
          this.$refs.imgInner.style.height = getComputedStyle(this.$refs.articleSummaryInfoContent).height
        }
      }
      if(offsetWidthOfBodyEl <= 750) {
        let lineHeight = parseInt(getComputedStyle(this.$refs.summary).lineHeight)
        this.$refs.summary.style.height = lineHeight * 3 + 'px'
      }
    },
    submitArticleLabel(){
      this.$router.push({path:'/routine/article_manage', query: {article_label: this.article.article_label}})
    },
    getCountOfComment() {
      CommentApi.getCountOfCommentByArticleId(this.article.article_id).then((res) => {
        if(res.status === 200) {
          this.countOfComment = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    goToTheCommentEditor() {
      this.$router.push({path:'/routine/article/' + this.article.article_id, query: {gotoce: 1}})
    },
    goToTheCommentList() {
      this.$router.push({path:'/routine/article/' + this.article.article_id, query: {gotocl: 1}})
    }
  }
}
</script>

<style scoped lang="stylus">
.article-summary
  width 100%
  background white
  border-bottom 1px solid #f0f2f7

.article-summary-info-content
  width 100%

.article-summary-info
  margin 5px 0px

.article-summary-title
.article-summary-info
.article-summary-content
{
  height auto
  word-wrap break-word
}

.article-summary-label
.article-summary-comment
  color rgb(23, 81, 153)

.article-summary-label:hover
.article-summary-comment:hover
  color #A2A2A2

.article-summary-title
  margin-bottom 5px

.article-summary-content
  line-height 1.6rem
  overflow hidden


.article-summary-previewimage
  width: auto
  height 100px
  border-radius 4px
  transition all 0.5s ease

.article-summary-previewimage:hover
  transform scale(1.1)

@media (min-width: 750px){
  .article-summary-previewimage{
    margin-left 20px
  }
}

@media (max-width: 750px){
  .article-summary{
    width 100%
  }
  .article-summary-info{
    flex-wrap wrap
  }
  .article-summary-content{
    display flex
    flex-direction column
  }
  .article-summary-previewimg-inner-mobile{
    position relative
    width 100%
    height 150px
    overflow hidden
    margin 10px 0px
    border-radius 4px

  }
  .article-summary-previewimage-mobile{
    position absolute
    width 100%
    height auto
  }
}
.article-summary-content
  position relative
  height 10rem
  overflow hidden
  position relative

.readAll
  z-index 0
  display flex
  position absolute
  bottom 0
  right 0
  color rgb(23, 81, 153)


.readAll:hover
  color black

.summary-cover
  width 8rem
  background linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))

.gap
.gap-mobile
  width 100%
  height 7px
  background rgb(247, 247, 247)
</style>
