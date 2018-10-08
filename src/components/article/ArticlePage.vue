<template>
    <div class="article-page max-width-750">
      <Article :article="article"></Article>
      <ul>
        <li v-for="comment in commentList"
            v-bind:key="comment.comment_id">
          <Comment  :comment="comment"></Comment>
        </li>
      </ul>
    </div>
</template>

<script>
import Article from './Article.vue'
import Comment from '../comment/Comment.vue'
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
      currentPage: 0
    }
  },
  components: {
    Article,
    Comment
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
      if (this.currentPage == this.maxPage) {
        return
      }
      CommentApi.getCommentListByArticleId(this.article_id, this.currentPage, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.commentList = res.data.commentList
          this.maxPage = res.data.maxPage
          this.currentPage++
        }
      })
    },
    formatTheDate() {
      console.log(this.article)
      this.article.article_releaseTime = dateFormat.dateFtt('yyyy-MM-dd', new Date(this.article.article_releaseTime))
    }
  }
}
</script>

<style scoped lang="stylus">
@media(max-width: 750px){
  .article-page {
    width 100%
  }
}
</style>
