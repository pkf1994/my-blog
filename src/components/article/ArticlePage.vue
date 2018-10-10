<template>
    <div class="article-page max-width-750">
      <Article :article="article"></Article>
      <div class="comment-title common-padding font-bold font-ll">
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
import Comment from '../comment/Comment.vue'
import CommentEditor from '../comment/CommentEidtor.vue'
import Loading from '../loading/Loading.vue'
import Nomore from '../loading/Nomore.vue'
import ClickForMore from '../loading/ClickForMore.vue'
import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
import ArticleApi from '../../api/article_api.js'
import CommentApi from '../../api/comment_api.js'
import dateFormat from '../../js/dateFormatUtil.js'
export default {
  maxins: [ScrollRefreshMixin],
  data: function() {
    return {
      article_id: 0,
      article: {},
      commentList: [],
      maxPage: 1,
      pageScale: 5,
      currentPage: 0,
      countOfComment: 0,
      isLoading: false
    }
  },
  components: {
    Article,
    Comment,
    CommentEditor,
    Loading,
    Nomore,
    ClickForMore
  },
  created() {
    this.article_id = this.$route.params.article_id
    this.loadArticleData()
    this.loadCommentListData()
  },
  methods: {
    loadArticleData() {
      ArticleApi.getArticleById(this.article_id).then((res) => {
        if (res.status === 200) {
          this.article = res.data
          this.formatTheDate()
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
      window.scrollTo(0, this.$refs.commentEditor.$el.offsetTop - 65)
      this.$refs.commentEditor.focusTheTextArea()
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
