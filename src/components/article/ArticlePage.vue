<template>
    <div class="article-page common-border">
      <LoadingPage v-if="!articleLoaded || !commentListLoaded"></LoadingPage>
      <div v-show="articleLoaded && commentListLoaded" >
        <Article :article="article"></Article>
        <div id="massage-title" class="comment-title common-padding font-bold font-ll" ref="commentTitle">
          留言 <span class="font-m font-dark">({{countOfComment}})</span>
        </div>
        <div class="division"></div>
        <ul>
          <transition-group name="list-complete" tag="div">
              <Comment class="list-complete-item"
                        v-for="comment in commentList"
                       v-bind:key="comment.comment_id"
                       :comment="comment"
                       @scrollToCommentEditor="scrollToCommentEditor"
                       @deleted="afterDeleteComment"></Comment>
          </transition-group>
          <div class="division"></div>
          <Loading v-show="isLoading"></Loading>
          <ClickForMore v-show="!(maxPage==currentPage)&&!isLoading" @click="reLoadCommentListData"></ClickForMore>
          <Nomore v-show="maxPage==currentPage">没有更多内容</Nomore>
        </ul>
        <CommentEditor ref="commentEditor" @justSubmitComment="scrollToCommentTitle"></CommentEditor>
      </div>

      <BackToUp class="backtoup" ref="backtoup"></BackToUp>
    </div>
</template>

<script>
import Article from './Article.vue'
import LoadingPage from '../loading/LoadingPage.vue'
import Comment from '../comment/Comment.vue'
import CommentEditor from '../comment/CommentEidtor.vue'
import Loading from '../loading/Loading.vue'
import Nomore from '../loading/Nomore.vue'
import ClickForMore from '../loading/ClickForMore.vue'
import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
import CountDistanceToBody from '../mixin/CountDistanceToBody.vue'
import BackToUp from '../backToUp/BackToUp.vue'
import ArticleApi from '../../api/article_api.js'
import CommentApi from '../../api/comment_api.js'
import dateFormat from '../../js/dateFormatUtil.js'
import { mapActions, mapState } from 'vuex'
import CountDistanceToUpperEdge from '../../js/countDistanceToUpperEdge.js'
export default {
  mixins: [
    ScrollRefreshMixin,
    CountDistanceToBody
  ],
  props: {
    article_id: 0,
  },
  data: function() {
    return {
      article: {},
      commentList: [],
      startIndex: 0,
      maxPage: 1,
      pageScale: 5,
      currentPage: 0,
      countOfComment: 0,
      isLoading: false,
      articleLoaded: false,
      commentListLoaded: false

    }
  },
  inject:['isMobile'],
  computed: {
    ...mapState([
      'offsetHeightOfNavbar',
      'scrollTopOfDocumentEl'
    ])
  },
  provide() {
    return {
      article_id: parseInt(this.$route.params.article_id),
    }
  },
  components: {
    Article,
    Comment,
    CommentEditor,
    Loading,
    Nomore,
    LoadingPage,
    ClickForMore,
    BackToUp
  },
  created() {
    this.loadArticleData()
    this.loadCommentListData(true)
  },
  mounted() {
    this.uploadOffsetTopOfCommentTitle()
    this.initLocationOfBackToUp()
  },
  watch: {
    article_id(){
    }
  },
  methods: {
    ...mapActions([
      'appointOffsetTopOfCommentTitle'
    ]),
    loadArticleData() {
      ArticleApi.getArticleById(this.article_id).then((res) => {
        if (res.status === 200) {
          this.article = res.data
          this.formatTheDate()
          this.articleLoaded = true
        }
      }, (err) => {
        console.log(err)
      })
    },
    loadCommentListData(handleRouterBoolean) {
      if (this.currentPage === this.maxPage) {
        return
      }
      this.currentPage++
      CommentApi.getCommentListByLimitIndexAndArticleId(this.article_id, this.startIndex, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.startIndex = this.currentPage * this.pageScale
          this.commentList = this.commentList.concat(res.data.commentList)
          this.maxPage = res.data.maxPage
          this.countOfComment = res.data.countOfComment
          this.commentListLoaded = true
          if(handleRouterBoolean) {
            this.$nextTick(() => {
              this.handleRouterQuery()
            })
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    reLoadCommentListData() {
      this.isLoading = true
      setTimeout(() => {
        this.loadCommentListData(false)
        this.isLoading = false
      }, 1000)
    },
    formatTheDate() {
      this.article.article_releaseTime = dateFormat.dateFtt('yyyy-MM-dd', new Date(this.article.article_releaseTime))
    },
    scrollToCommentEditor() {
      window.scrollTo(0, CountDistanceToUpperEdge.countDistanceToDocumentUpperEdge(this.$refs.commentEditor.$el) - this.offsetHeightOfNavbar)
      this.$refs.commentEditor.focusTheTextArea()
    },
    uploadOffsetTopOfCommentTitle() {
      setTimeout(() => {
        /*console.log(this.$refs.commentTitle.offsetTop)*/
        this.appointOffsetTopOfCommentTitle(this.$refs.commentTitle.offsetTop)
      }, 500)
    },
    handleRouterQuery() {
      if(this.$route.query.id_of_comment_scroll_to != undefined) {
        let theCommentEl = document.getElementById('comment_' + this.$route.query.id_of_comment_scroll_to)
        if(theCommentEl == null) {
          console.log(this.$refs.commentTitle)
          window.scrollTo(0, CountDistanceToUpperEdge.countDistanceToDocumentUpperEdge(this.$refs.commentTitle) - this.offsetHeightOfNavbar)
          return
        }
        window.scrollTo(0, CountDistanceToUpperEdge.countDistanceToDocumentUpperEdge(theCommentEl) - this.offsetHeightOfNavbar)
        return
      }
      if(this.$route.query.gotocl == 1) {
        let messageTitleEl = document.getElementById('massage-title')
        window.scrollTo(0, CountDistanceToUpperEdge.countDistanceToClientUpperEdge(messageTitleEl) - this.offsetHeightOfNavbar)
        return
      }
      if(this.$route.query.gotoce == 1) {
        let commentEditorEl = this.$refs.commentEditor.$el
        window.scrollTo(0, CountDistanceToUpperEdge.countDistanceToClientUpperEdge(commentEditorEl) - this.offsetHeightOfNavbar)
        return
      }

      if(this.$route.query.gotoce != 1 && this.$route.query.gotocl != 1 && this.$route.query.id_of_comment_scroll_to == undefined && this.$route.query.spy != undefined) {
        if(this.$route.query.spy < 150) {
          window.scrollTo(0, this.$route.query.spy)
        }else {
          window.scrollTo(0, 150)
        }

      }

    },
    afterDeleteComment(comment_id) {
      this.startIndex --
      this.commentList.forEach((item, index) => {
        if(item.comment_id == comment_id){
          this.commentList.splice(index,1)
          this.countOfComment --
        }
      })
    },
    initLocationOfBackToUp(){

      if(this.isMobile){
        return
      }

      let windowInnerWidth = window.innerWidth
      let leftOfBackToUp
      if(windowInnerWidth > 850) {
        leftOfBackToUp = (windowInnerWidth - 750) * 0.5 - 50
      }
      this.$refs.backtoup.$el.style.left = leftOfBackToUp + 'px'
    },
    scrollToCommentTitle() {

      this.commentList = []
      this.startIndex = 0
      this.maxPage = 1
      this.currentPage = 0
      this.countOfComment  = 0
      this.loadCommentListData(false)
      window.scrollTo(0,CountDistanceToUpperEdge.countDistanceToDocumentUpperEdge(this.$refs.commentTitle) - this.offsetHeightOfNavbar)
    }
  }
}
</script>

<style scoped lang="stylus">
.article-page
  position relative
  background white
  min-height 500px
  width 750px
@media(max-width: 750px){
  .article-page {
    width 100%
  }
}

.backtoup
  position fixed
  bottom  70px

.list-complete-item
  transition all 0.5s

.list-complete-enter
.list-complete-leave-to
  opacity 0
  transform translateY(10px)

.list-complete-leave-active
  position absolute


</style>
