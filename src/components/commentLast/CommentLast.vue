<template>
    <div class="comment-last">
        <div class="comment-last-headline font-bold">最近评论</div>
        <div class="comment-last-list">
          <div v-for="comment in commentList" class="comment-last-list-item">
            <span class="cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostId, comment.comment_id);
            }">{{comment.comment_author.visitor_name}}</span>&nbsp;:&nbsp;
            <span class="overRowHandle cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostArticle.article_id, comment.comment_id);
            }">{{comment.comment_content}}</span>
            <div class="comment-last-host-article"><div class="cursorp overRowHandle" @click="() => {
              goToTheArticlePage(comment.comment_hostArticle.article_id, comment.comment_id);
            }">[{{comment.comment_hostArticle.article_label}}]&nbsp;{{comment.comment_hostArticle.article_title}}</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import CommentApi from '../../api/comment_api.js'
  export default {
    data() {
      return {
        commentList: []
      }
    },
    created() {
      this.loadCommentListData()
    },
    methods: {
      loadCommentListData() {
        CommentApi.getCommentLast(4).then((res) => {
          if(res.status === 200) {
            this.commentList = res .data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      goToTheArticlePage(comment_hostId, comment_id) {
        this.$router.push({path: '/article/' + comment_hostId, query: {id_of_comment_scroll_to: comment_id}})
        window.addEventListener('road', () => {
          let theCommentEl = document.getElementById('comment_' + this.$route.query.idOfCommentScrollTo)
          window.scrollTo(0, CountDistanceToDocumentUpperEdge.countDistanceToClientUpperEdge(theCommentEl) - 50)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .comment-last-headline
    line-height 2rem
    border-top 1px solid  rgb(222, 226, 230)
    padding-top 15px

  .comment-last-list-item
    margin-bottom 10px
    margin-left 5px
    color rgb(23, 81, 153)
    border 1px solid rgb(222, 226, 230)
    border-radius 5px
    padding 5px 5px

  .comment-last-list-item:hover
    color black

  .comment-last-host-article
    position relative
    background rgb(222, 226, 230)
    line-height 2rem
    border-radius 5px
    padding-left 5px
    margin-top 10px
  .comment-last-host-article:before
      content ''
      width 0
      height 0
      border 7px solid transparent
      border-bottom-color rgb(222, 226, 230)
      position absolute
      left 15px
      top -14px
      margin-top -20p

</style>
