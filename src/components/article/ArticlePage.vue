<template>
    <div class="article-page max-width-750">
      <LoadingPage v-if="!articleLoaded"></LoadingPage>
      <Article :article="article"></Article>
      <div id="massage-title" class="comment-title common-padding font-bold font-ll" ref="commentTitle">
        留言 <span class="font-m font-dark">({{countOfComment}})</span>
      </div>
      <div class="division"></div>
      <ul>
        <li v-for="comment in commentList"
            v-bind:key="comment.comment_id">
          <Comment  :comment="comment" @scrollToCommentEditor="scrollToCommentEditor"></Comment>
        </li>
        <div class="division"></div>
        <Loading v-show="isLoading"></Loading>
        <ClickForMore v-show="!(maxPage==currentPage)&&!isLoading" @click="reLoadCommentListData"></ClickForMore>
        <Nomore v-show="maxPage==currentPage">没有更多内容</Nomore>
      </ul>
      <CommentEditor ref="commentEditor"></CommentEditor>
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
import ArticleApi from '../../api/article_api.js'
import CommentApi from '../../api/comment_api.js'
import dateFormat from '../../js/dateFormatUtil.js'
import { mapActions, mapState } from 'vuex'
import CountDistanceToDocumentUpperEdge from '../../js/countDistanceToDocumentUpperEdge.js'
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
      articleLoaded: false
    }
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
    ClickForMore
  },
  created() {
    this.initArticleId()
    this.loadArticleData()
    this.loadCommentListData()
  },
  mounted() {
    this.uploadOffsetTopOfCommentTitle()
  },
  computed: {
    ...mapState([
      'offsetHeightOfNavbar'
    ])
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
          this.$nextTick(() => {
            this.scrollToTheComment()
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
    scrollToTheComment() {
      let theCommentEl = document.getElementById('comment_' + this.$route.query.idOfCommentScrollTo)
      window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(theCommentEl) - 50)
    }
  }
}
</script>

<style scoped lang="stylus">
.article-page
  background white
@media(max-width: 750px){
  .article-page {
    width 100%
  }
}
</style>
