<template>
    <div class="comment common-padding flex-column-center">
      <div class="comment-author font-bold font-m">{{comment.comment_author.visitor_name}}</div>
      <div v-if="subComment.comment_id" class="refer-comment">
        <SubComment :subComment="subComment"></SubComment>
      </div>
      <div class="comment-content font-m">{{comment.comment_content}}</div>
      <div class="comment-releasetime-refer font-dark font-m">
        <span>{{comment.comment_releaseTime}}</span>
        |&nbsp;<span class="cursorp" @click="clickRefer">引用</span>
      </div>
    </div>
</template>

<script>
import SubComment from '../comment/SubComment.vue'
import getDateDiff from '../../js/getDateDiff.js'
import CommentApi from '../../api/comment_api.js'
import { mapActions } from 'vuex'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        subComment:{}
    }
  },
  created() {
    this.comment.comment_releaseTime = getDateDiff.getDateDiff(new Date(this.comment.comment_releaseTime).getTime())
    if(this.comment.comment_referComment){
      CommentApi.getCommentById(this.comment.comment_referComment).then((res) => {
        if(res.status === 200){
          this.subComment = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    SubComment
  },
  methods: {
    ...mapActions([
      'appointIdOfCommentBeingRefering'
    ]),
    clickRefer() {
      this.appointIdOfCommentBeingRefering(this.comment.comment_id)
      this.$emit('scrollToCommentEditor')
    }
  }
}
</script>

<style scoped lang="stylus">
.comment-author
.comment-content
.comment-releasetime-refer
  padding 5px 0px
</style>
