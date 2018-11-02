<template>
    <div class="article-page">
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
        <CommentEditor ref="commentEditor"></CommentEditor>
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
import CountDistanceToDocumentUpperEdge from '../../js/countDistanceToUpperEdge.js'
export default {
  mixins: [
    ScrollRefreshMixin,
    CountDistanceToBody
  ],
  data: function() {
    return {
      article_id: 0,
      article: {},
      commentList: [],
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
      'offsetHeightOfNavbar'
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
    this.initArticleId()
    this.loadArticleData()
    this.loadCommentListData()
  },
  mounted() {
    this.uploadOffsetTopOfCommentTitle()
    this.initLocationOfBackToUp()
  },
  methods: {
    ...mapActions([
      'appointOffsetTopOfCommentTitle'
    ]),
    initArticleId() {
      this.article_id = parseInt(this.$route.params.article_id)
    },
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
    loadCommentListData() {
      if (this.currentPage === this.maxPage) {
        return
      }
      this.currentPage++
      CommentApi.getCommentListByArticleId(this.article_id, this.currentPage, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.commentList = this.commentList.concat(res.data.commentList)
          this.maxPage = res.data.maxPage
          this.countOfComment = res.data.countOfComment
          this.commentListLoaded = true
          this.$nextTick(() => {
            this.handleRouterQuery()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    reLoadCommentListData() {
      this.isLoading = true
      setTimeout(() => {
        this.loadCommentListData()
        this.isLoading = false
      }, 1000)
    },
    formatTheDate() {
      this.article.article_releaseTime = dateFormat.dateFtt('yyyy-MM-dd', new Date(this.article.article_releaseTime))
    },
    scrollToCommentEditor() {
      window.scrollTo(0, this.countDistanceToBody(this.$refs.commentEditor.$el) - this.offsetHeightOfNavbar)
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
        window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(theCommentEl) - this.offsetHeightOfNavbar)
      }
      if(this.$route.query.gotocl == 1) {
        let messageTitleEl = document.getElementById('massage-title')
        window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(messageTitleEl) - this.offsetHeightOfNavbar)
      }
      if(this.$route.query.gotoce == 1) {
        let commentEditorEl = this.$refs.commentEditor.$el
        window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(commentEditorEl) - this.offsetHeightOfNavbar)
      }
    },
    afterDeleteComment(comment_id) {
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
    }
  }
}
</script>

<style scoped lang="stylus">
.article-page
  background white
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
