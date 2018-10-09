<template>
  <div class="comment-editor common-padding">
    <div class="comment-edit-content">
      <div class="font-m font-bold">编写您的留言:</div>
      <SubComment v-if="commentBeingRefering.comment_id" :subComment="commentBeingRefering"></SubComment>
      <textarea name="edit-content" class="the-textarea font-m" rows="5"></textarea>
    </div>
    <div class="comment-edit-regiter">
      <br>
      <div class="font-m font-bold">为您的留言设置昵称</div>
      <input type="text" class="the-input font-m" placeholder="必填">
      <br>
      <br>
      <div class="font-m font-bold">您的邮件地址</div>
      <input type="text" class="the-input font-m" placeholder="必填">
      <br>
      <br>
      <div class="font-m font-bold">您的个人网站地址</div>
      <input type="text" class="the-input font-m" placeholder="如果有，请填写">
      <br>
      <br>
      <input type="checkbox"/><span class="font-m font-bold">记住以上个人信息？</span>
      <br>
      <br>
    </div>
    <button class="font-m">发表</button>
  </div>
</template>

<script>
import SubComment from '../comment/SubComment.vue'
import { mapState } from 'vuex'
import CommentApi from '../../api/comment_api.js'
export default {
  data(){
    return {
      isRefering: false,
      commentBeingRefering: {}
    }
  },
  watch:{
    IdOfCommentBeingRefering(newIdOfCommentBeingRefering, oldIdOfCommentBeingRefering){
      CommentApi.getCommentById(newIdOfCommentBeingRefering).then((res) => {
        if(res.status === 200){
          this.commentBeingRefering = res.data
          this.isRefering = true
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    SubComment
  },
  computed:{
    ...mapState([
      'IdOfCommentBeingRefering'
    ])
  }
}
</script>

<style scoped lang="stylus">
.the-input
.the-textarea
  width 300px
  padding 2px 5px
  margin-top 10px
  margin-bottom 10px

.the-textarea
  width 100%

@media(max-width: 750px){
  button{
    width 100%
    padding 10px 20px
  }
}

@media(max-width: 750px){
  .the-input{
    width 100%
  }
}

</style>
