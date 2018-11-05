<template>
    <div :id="'comment_' + comment.comment_id" class="comment common-padding">
      <div class="comment-author font-bold font-s flex-row-space-between" >
        <span v-bind:class="{redirectable: isRedirectable}" @click="redirectToTheirSite">{{comment.comment_author.visitor_name}}</span>
        <span><i class="fa fa-close font-dark cursorp" @click="confirmDeleteThisComment"></i></span>
      </div>
      <div v-if="subComment.comment_id" class="refer-comment">
        <SubComment :subComment="subComment"></SubComment>
      </div>
      <div class="comment-content font-s common-line-height">{{comment.comment_content}}</div>
      <div class="comment-releasetime-refer font-dark font-s">
        <span>{{comment.comment_releaseTime}}</span>
        |&nbsp;<span class="cursorp" @click="clickRefer">引用</span>
      </div>

      <ModalWithConfirm
        :modalHeaderProp="deleteCommentModal.modalHeader"
        :modalBodyProp="deleteCommentModal.modalBody"
        :btnValueOfYesProp="deleteCommentModal.btnValueOfYes"
        :btnValueOfNoProp="deleteCommentModal.btnValueOfNo"
        :isLoading="deleteCommentModal.isLoading"
        :onlyNorify="deleteCommentModal.onlyNorify"
        :show="deleteCommentModal.show"
        :error="deleteCommentModal.happenError"
        @clickYesEventOfParent='deleteTheComment'
        @clickNoEventOfParent='()=>{deleteCommentModal.show=false}'
        @clickYesAfterError='()=>{deleteCommentModal.show=false}'
      ></ModalWithConfirm>
    </div>
</template>

<script>
import SubComment from '../comment/SubComment.vue'
import ModalWithConfirm from '../modal/ModalWithConfirm.vue'
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
        isRedirectable: this.comment.comment_author.visitor_siteAddress ? true : false,

        /*提交删除模态框*/
        deleteCommentModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          btnValueOfNo:'',
          happenError:false,
          isLoading:false,
          onlyNorify:false,
          show:false
        }
    }
  },
  created() {
    this.formatTheReleaseTime()
    this.loadSubCommentData()
  },
  components: {
    SubComment,
    ModalWithConfirm
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
    confirmDeleteThisComment(){
      this.deleteCommentModal.modalHeader = '请确认'
      this.deleteCommentModal.modalBody = '删除操作将无法撤销，是否确认删除？'
      this.deleteCommentModal.btnValueOfYes = '确认'
      this.deleteCommentModal.btnValueOfNo = '取消'
      this.deleteCommentModal.show = true
    },
    deleteTheComment(){
      CommentApi.deleteCommentById(this.comment.comment_id).then((res) => {
        if(res.status === 200) {
          console.log('delete comment successful')
          this.$emit('deleted', this.comment.comment_id)
        }
      }).catch((err) => {
        this.deleteCommentModal.happenError = true
        this.deleteCommentModal.modalBody = '删除失败：' + err
        this.deleteCommentModal.isLoading = false
        if (err.response.status == 400) {
          this.deleteCommentModal.modalBody = '删除失败：' + err.response.data.msg
        }
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
