<template>
  <div class="comment-last-item">
      <span class="cursorp" @click="goToTheArticlePage">{{comment.comment_author.visitor_name}}</span>&nbsp;:&nbsp;
      <span class="cursorp" @click="goToTheArticlePage">{{comment.comment_content}}</span>
    <div class="comment-last-host-article">
      <div class="cursorp" @click="goToTheArticlePage">
        [{{comment.comment_hostArticle.article_label}}]&nbsp;{{comment.comment_hostArticle.article_title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
     props: {
       comment:{
         type:Object
       }
     },
    methods: {
      goToTheArticlePage() {
        this.$emit('goToTheArticlePage', this.comment.comment_hostArticle.article_id, this.comment.comment_id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .comment-last-item
    margin-bottom 10px
    margin-left 5px
    color rgb(23, 81, 153)
    border 1px solid rgb(222, 226, 230)
    border-radius 5px
    padding 5px 5px

  .comment-last-item:hover
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
