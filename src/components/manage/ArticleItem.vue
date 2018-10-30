<template>
    <div class="article-item" :class="{colorful: article.colorful}">
      <span class="article-item-title cursorp"
            :class="{deleted: deleted}"
            @click="goToTheArticlePage">{{article.article_title}}</span>
      <span class="article-item-author">{{article.article_author}}</span>
      <span class="article-item-label flex-row-center cursor">{{article.article_label}}</span>
      <span class="article-item-releasetime flex-row-center">{{article.article_releaseTime}}</span>
      <span class="edit flex-row-center">
        <i class="fa fa-edit cursorp font-dark operation-font" @click="goToTheEditPage"></i>
      </span>
      <span class="delete flex-row-center">
        <i class="fa fa-close cursorp font-dark operation-font" @click="confirmDeleteTheArticle"></i>
      </span>
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
      this.article.article_releaseTime = dataFormatUtil.dateFtt('yyyy-MM-dd', new Date(this.article.article_releaseTime))
     },
    watch: {
      article() {
        this.article.article_releaseTime = dataFormatUtil.dateFtt('yyyy-MM-dd', new Date(this.article.article_releaseTime))
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
.article-item
  width 100%
  display flex
  padding-top 15px
  padding-bottom 15px
  border-bottom 1px solid rgb(222, 226, 230)

.article-item:hover
  background linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0.05), rgba(255,255,255,1))

.article-item-title
  width 50%
  color rgb(23, 81, 153)
  padding-right 10px

.article-item-title:hover
  color black

.article-item-author
  width 15%
  display flex
  align-items center

.article-item-label
  width 10%
  color rgb(23, 81, 153)
  display flex
  align-items center

.article-item-label:hover
  color black

.article-item-releasetime
  width 15%
  display flex
  align-items center

.edit
  width 5%
  display flex
  align-items center

.delete
  width 5%
  display flex
  align-items center

.colorful
  background linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0.05), rgba(255,255,255,1))

.deleted
  text-decoration line-through
  color black

.deleted:before
  content "(已删除)"

.operation-font:hover
  color black

</style>
