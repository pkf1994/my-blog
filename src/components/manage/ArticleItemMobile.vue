<template>
    <div>
      <div class="article-item-mobile flex-row-center">
        <div class="article-msg">
          <div class="article-title-label overRowHandle">
            <span class="article-item-label-mobile cursorp">[{{article.article_label}}]</span>
            <span class="article-item-title-mobile cursorp"
                  :class="{deleted: deleted}"
                  @click="goToTheArticlePage">{{article.article_title}}</span></div>
          <div>
            <span>by: {{article.article_author}}</span>&nbsp;|
            <span>{{article.article_releaseTime}}</span>
          </div>
        </div>
        <div class="operation-mobile flex-column-center">
          <div><i class="fa fa-edit cursorp font-dark" @click="goToTheEditPage"></i></div>
          <div><i class="fa fa-close cursorp font-dark" @click="confirmDeleteTheArticle"></i></div>
        </div>

        <ModalWithConfirm
          :modalHeaderProp="deleteArticleModal.modalHeader"
          :modalBodyProp="deleteArticleModal.modalBody"
          :btnValueOfYesProp="deleteArticleModal.btnValueOfYes"
          :btnValueOfNoProp="deleteArticleModal.btnValueOfNo"
          :isLoading="deleteArticleModal.isLoading"
          :onlyNorify="deleteArticleModal.onlyNorify"
          :show="deleteArticleModal.show"
          :error="deleteArticleModal.happenError"
          @clickYesEventOfParent='deleteTheArticle'
          @clickNoEventOfParent='()=>{deleteArticleModal.show=false}'
          @clickYesAfterError='()=>{deleteArticleModal.show=false}'
        />
      </div>

    </div>
</template>

<script>
  import ModalWithConfirm from '../modal/ModalWithConfirm.vue'
  import dataFormatUtil from '../../js/dateFormatUtil.js'
  import ArticleApi from '../../api/article_api.js'
  export default {
    props: {
      article: {
        type: Object
      }
    },
    data() {
      return {

        deleted: false,

        /*提交删除模态框*/
        deleteArticleModal: {
          modalHeader:'',
          modalBody:'',
          btnValueOfYes:'',
          btnValueOfNo:'',
          happenError:false,
          isLoading:false,
          onlyNorify:false,
          show:false
        },
      }
    },
    components: {
      ModalWithConfirm
    },
    created() {
      this.article.article_releaseTime = dataFormatUtil.dateFtt('yyyy-MM-dd hh:mm', new Date(this.article.article_releaseTime))
    },
    watch: {
      article() {
        this.article.article_releaseTime = dataFormatUtil.dateFtt('yyyy-MM-dd hh:mm', new Date(this.article.article_releaseTime))
      }
    },
    methods: {
      goToTheArticlePage() {
        if(this.deleted){
          return
        }
        this.$router.push('/article/' + this.article.article_id)
      },
      goToTheEditPage() {
        if(this.deleted){
          return
        }
        this.$router.push('/article_edit/' + this.article.article_id)
      },
      confirmDeleteTheArticle() {
        if(this.deleted){
          return
        }
        this.deleteArticleModal.modalHeader = '请确认'
        this.deleteArticleModal.modalBody = '删除操作将无法撤销，是否确认删除？'
        this.deleteArticleModal.btnValueOfYes = '确认'
        this.deleteArticleModal.btnValueOfNo = '取消'
        this.deleteArticleModal.show = true
      },
      deleteTheArticle() {
        this.deleteArticleModal.isLoading = true
        ArticleApi.deleteArticle(this.article.article_id).then((res) => {
          if(res.status === 200) {
            setTimeout(() => {
              this.deleteArticleModal.show = false
              this.deleted = true
              this.$emit('deleted', this.article.article_id)
            },1500)
          }
        }).catch((err) => {
          this.deleteArticleModal.happenError = true
          this.deleteArticleModal.modalBody = '删除失败：' + err
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.article-item-mobile
  width 100%
  padding-top 15px
  padding-bottom 15px
  border-bottom 1px solid rgb(222, 226, 230)

.article-msg
  width 90%

.article-title-label
  margin-bottom 10px
  color rgb(23, 81, 153)

.article-item-label-mobile
  color #50a14f

.operation-mobile
  width 10%
  justify-content space-between

.deleted
  text-decoration line-through
  color black

.deleted:before
  content "(已删除)"

.fa-edit:hover
  color black

.fa-close:hover
  color black
</style>
