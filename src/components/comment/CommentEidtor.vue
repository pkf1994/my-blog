<template>
  <div class="comment-editor common-padding">
    <div class="comment-edit-content">
      <div class="font-m font-bold  required">编写您的留言<span class="format-warn font-s" v-show="commentContentIsWrong&&!textAreaIsFocus">&nbsp;&nbsp;&nbsp;{{commentContentWrongMessage}}</span></div>
      <SubComment v-if="commentBeingRefering.comment_id" :subComment="commentBeingRefering"></SubComment>
      <textarea ref="theTextArea" class="the-textarea font-m" rows="5" v-model="comment_content" @focus="triggerTextAreaFocus" @blur="triggerTextAreaFocus"></textarea>
    </div>
    <div class="comment-edit-regiter">
      <br>
      <div class="font-m font-bold  required">为您的留言设置昵称</div>
      <input type="text" class="the-input font-m" v-model="visitor_name" @focus="triggerNameInputFocus" @blur="triggerNameInputFocus">&nbsp;&nbsp;&nbsp;&nbsp;<span class="format-warn" v-show="nameIsWrong&&!nameInputIsFocus">{{nameWrongMessage}}</span>
      <br>
      <br>
      <div class="font-m font-bold  required">您的邮件地址</div>
      <input type="text" class="the-input font-m" v-model="visitor_email" @focus="triggerEmailInputFocus" @blur="triggerEmailInputFocus">&nbsp;&nbsp;&nbsp;&nbsp;<span class="format-warn" v-show="emailIsWrong&&!emailInputIsFocus">{{emailWrongMessage}}</span>
      <br>
      <br>
      <div class="font-m font-bold">您的个人网站地址</div>
      <input type="text" class="the-input font-m" v-model="visitor_siteAddress" @focus="triggerSiteAddressInputFocus" @blur="triggerSiteAddressInputFocus">&nbsp;&nbsp;&nbsp;&nbsp;<span class="format-warn" v-show="siteAddressIsWrong&&!siteAddressInputIsFocus">网址格式有误</span>
      <br>
      <br>
      <input type="checkbox"/><span class="font-m font-bold">记住以上个人信息？</span>
      <br>
      <br>
    </div>
    <button class="font-m" @click="submitComment"><span v-show="!isSubmittingComment">发表</span><i v-show="isSubmittingComment" class="fa fa-spinner fa-pulse"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="submitFinish" ><i class="fa fa-check"></i>留言提交成功</span>
  </div>
</template>

<script>
import SubComment from '../comment/SubComment.vue'
import { mapState, mapActions } from 'vuex'
import CommentApi from '../../api/comment_api.js'
export default {
  inject:[
    'article_id'
  ],
  data(){
    return {
      hostId: this.article_id,
      isRefering: false,
      commentBeingRefering: {},
      visitor_name: '',
      visitor_email: '',
      visitor_siteAddress: '',
      comment_content:'',
      commentContentIsWrong: false,
      commentContentWrongMessage: '',
      textAreaIsFocus: false,
      nameIsWrong: false,
      nameWrongMessage: '',
      nameInputIsFocus: false,
      emailIsWrong: false,
      emailWrongMessage: '',
      emailInputIsFocus: false,
      siteAddressIsWrong: false,
      siteAddressInputIsFocus: false,
      isSubmittingComment: false,
      submitFinish: false
    }
  },
  watch:{
    idOfCommentBeingRefering(newIdOfCommentBeingRefering, oldIdOfCommentBeingRefering){
     this.loadSubCommentData(newIdOfCommentBeingRefering)
    },
    comment_content() {
      this.checkCommentContent()
    },
    visitor_email() {
      this.checkEmail()
    },
    visitor_name() {
      this.checkName()
    },
    visitor_siteAddress() {
      this.checkSiteAddress()
    }
  },
  components: {
    SubComment
  },
  computed:{
    ...mapState([
      'idOfCommentBeingRefering',
      'idOfArticleBeingReading',
      'offsetTopOfCommentTitle',
      'offsetHeightOfNavbar'
    ])
  },
  methods: {
    ...mapActions([
      'changeArticlePageRouterStatus'
    ]),
    loadSubCommentData(idOfCommentBeingRefering) {
      CommentApi.getCommentById(idOfCommentBeingRefering).then((res) => {
        if(res.status === 200){
          this.commentBeingRefering = res.data
          this.isRefering = true
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    checkCommentContent() {
      if(this.comment_content.trim() == ''){
        this.commentContentIsWrong = true
        this.commentContentWrongMessage = '留言内容不能为空'
        return
      }
      this.commentContentIsWrong = false
    },
    checkName() {
      if(this.visitor_name.trim() == ''){
        this.nameIsWrong = true
        this.nameWrongMessage = '昵称尚未填写'
      }
      if(this.visitor_name.getLength()<4){
        this.nameIsWrong = true
        this.nameWrongMessage = '昵称长度过短'
        return
      }
      if(this.visitor_name.match(/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/) == null) {
        this.nameIsWrong = true
        this.nameWrongMessage = '昵称应由中文、英文字母、以及下划线组成'
        return
      }
      if(this.visitor_name.getLength()>14){
        this.nameIsWrong = true
        this.nameWrongMessage = '昵称长度过长'
        return
      }
      this.nameIsWrong = false
    },
    checkEmail() {
      if (this.visitor_email.trim() == ''){
        this.emailWrongMessage = '邮件地址尚未填写'
        this.emailIsWrong = true
        return
      }
      if (this.visitor_email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) == null) {
         this.emailWrongMessage = '邮件格式有误'
         this.emailIsWrong = true
         return
      }
      this.emailIsWrong = false
    },
    focusTheTextArea() {
      this.$refs.theTextArea.focus()
    },
    checkSiteAddress() {
      if(this.visitor_siteAddress.trim() == ''){
        return
      }
      if (this.visitor_siteAddress.match(/^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(www\.){0,1}(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/) == null) {
        this.siteAddressIsWrong = true
        return
      }
      this.siteAddressIsWrong = false
    },
    triggerTextAreaFocus() {
      this.textAreaIsFocus = !this.textAreaIsFocus
    },
    triggerNameInputFocus() {
      this.nameInputIsFocus = !this.nameInputIsFocus
    },
    triggerEmailInputFocus() {
      this.emailInputIsFocus = !this.emailInputIsFocus
    },
    triggerSiteAddressInputFocus() {
      this.siteAddressInputIsFocus = !this.siteAddressInputIsFocus
    },
    submitComment() {
      this.checkCommentContent()
      this.checkName()
      this.checkEmail()
      this.checkSiteAddress()
      if(this.commentContentIsWrong || this.nameIsWrong || this.emailIsWrong || this.siteAddressIsWrong){
        return
      }
      this.isSubmittingComment = true
      CommentApi.submitComment(this.visitor_name,
                                this.commentBeingRefering.comment_id,
                                this.comment_content,
                                this.hostId,
                                this.visitor_email,
                                this.visitor_siteAddress
      ).then((res) => {
        if(res.status === 200) {
          setTimeout(() => {
            this.isSubmittingComment = false
            this.submitFinish = true
            setTimeout(() => {
              this.changeArticlePageRouterStatus()
              window.scrollTo(0,this.offsetTopOfCommentTitle - this.offsetHeightOfNavbar)
            },500)
          }, 2000)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    clearCommentEditor() {
      this.comment_content = ''
      this.visitor_name = ''
      this.visitor_email =''
      this.visitor_siteAddress = ''
    },
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

.required:after
  content ' *'
  color red

.format-warn
  color red
  font-weight normal
</style>
