<template>
    <div class="comment-last">
        <div class="comment-last-headline font-bold">最近评论</div>
        <div class="comment-last-list">
          <div v-for="comment in commentList" class="comment-last-list-item">
            <span class="cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostId, comment.comment_id);
            }">{{comment.comment_author.visitor_name}}</span>&nbsp;:&nbsp;
            <span class="overRowHandle cursorp" @click="() => {
              goToTheArticlePage(comment.comment_hostId, comment.comment_id);
            }">{{comment.comment_content}}</span>
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
        CommentApi.getCommentLast(5).then((res) => {
          if(res.status === 200) {
            this.commentList = res .data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      goToTheArticlePage(comment_hostId, comment_id) {
        this.$router.push({path: '/article/' + comment_hostId, query: {idOfCommentScrollTo: comment_id}})
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
    margin-bottom 5px
    margin-left 5px
    color rgb(23, 81, 153)

  .comment-last-list-item:hover
    color black
</style>
