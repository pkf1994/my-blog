<template>
  <div class="sub-comment common-padding flex-column-center">
    <div class="comment-author font-bold font-m">引用&nbsp;{{subComment.comment_author.visitor_name}}&nbsp;的留言</div>
    <div class="comment-content font-m">{{subComment.comment_content}}</div>
    <div class="comment-releasetime-refer font-dark font-m">
      <span>{{subComment.comment_releaseTime}}</span>
    </div>
  </div>
</template>

<script>
  import getDateDiff from '../../js/getDateDiff.js'
  export default {
    props: {
      subComment: {
        type: Object,
        required: true
      }
    },
    created() {
      this.subComment.comment_releaseTime = getDateDiff.getDateDiff(new Date(this.subComment.comment_releaseTime).getTime())
    },
    watch:{
      subComment(){
        this.subComment.comment_releaseTime = getDateDiff.getDateDiff(new Date(this.subComment.comment_releaseTime).getTime())
      }
   }
  }
</script>

<style scoped lang="stylus">
  .sub-comment
    background #F7F7F7
  .comment-author
  .comment-content
  .comment-releasetime-refer
    padding 5px 0px
</style>
