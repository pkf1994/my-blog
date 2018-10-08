<template>
    <div class="comment common-padding flex-column-center">
      <div class="comment-author font-bold">{{comment.comment_author}}</div>
      <div class="refer-comment">
      </div>
      <div class="comment-content">{{comment.comment_content}}</div>
      <div class="comment-releasetime-refer font-dark">{{comment.comment_releasetime}}</div>
    </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
