<template>
    <div :id="'comment_' + comment.comment_id" class="comment common-padding">
      <div class="comment-author font-bold font-m flex-row-space-between" >
        <span v-bind:class="{redirectable: isRedirectable}" @click="redirectToTheirSite">{{comment.comment_author.visitor_name}}</span>
        <span><i class="fa fa-close font-dark cursorp" @click="deleteThisComment"></i></span>
      </div>
      <div v-if="subComment.comment_id" class="refer-comment">
        <SubComment :subComment="subComment"></SubComment>
      </div>
      <div class="comment-content font-m common-line-height">{{comment.comment_content}}</div>
      <div class="comment-releasetime-refer font-dark font-s">
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
        subComment:{},
        isRedirectable: this.comment.comment_author.visitor_siteAddress ? true : false
    }
  },
  created() {
    this.formatTheReleaseTime()
    this.loadSubCommentData()
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
    },
    redirectToTheirSite() {
      if(this.comment.comment_author.visitor_siteAddress){
        window.open('http://' + this.comment.comment_author.visitor_siteAddress);
      }
    },
    formatTheReleaseTime() {
      this.comment.comment_releaseTime = getDateDiff.getDateDiff(new Date(this.comment.comment_releaseTime).getTime())
    },
    loadSubCommentData() {
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
    deleteThisComment(){
      CommentApi.deleteCommentById(this.comment.comment_id).then((res) => {
        if(res.status === 200) {
          console.log('delete comment successful')
          this.$emit('deleted', this.comment.comment_id)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.comment-author
.comment-content
.comment-releasetime-refer
  padding 5px 0px

.comment-content
  padding 10px

.redirectable
  cursor pointer
  color #3354AA

.fa-close:hover
  color black
</style>
