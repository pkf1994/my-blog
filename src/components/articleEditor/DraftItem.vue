<template>
    <div class="draft-item">
      <div class="draft-title font-s font-bold flex-row-space-between">
        <span class="cursorp overRowHandle" @click="redirectToEditPage">{{draft.article_title}}</span>
        <span class="operation font-normal font-dark">
          <span class="cursorp" @click="redirectToEditPage" v-if="!isEditing"><i class="fa fa-edit"></i></span><span class="status" v-if="isEditing">编辑中</span>&nbsp;|
          <span class="cursorp" @click="deleteThisDraft"><i class="fa fa-close"></i></span>
        </span>
      </div>
      <div>
        <span class="savetime font-ss font-dark">最后一次提交：{{draft.article_releaseTime}}</span>
      </div>
    </div>
</template>

<script>
  import getDateDiff from '../../js/getDateDiff.js'
  import ArticleApi from '../../api/article_api.js'
  import { mapState } from 'vuex'
  export default {
    props: {
      draft: {
        type: Object
      }
    },
    data() {
      return {
        isEditing: false
      }
    },
    computed: {
      ...mapState([
        'scrollTopOfDocumentEl'
      ])
    },
    created() {
      this.formatTheDate()
    },
    methods: {
      formatTheDate() {
        this.draft.article_releaseTime = getDateDiff.getDateDiff(new Date(this.draft.article_releaseTime).getTime())
      },
      redirectToEditPage() {
        this.$emit('triggerEditingSlogan')
        this.isEditing = true
        this.$router.push({path:'/routine/article_edit/' + this.draft.article_id, query:{body_scroll_top: this.scrollTopOfDocumentEl}})
      },
      deleteThisDraft() {
        ArticleApi.deleteArticle(this.draft.article_id).then((res) => {
          if(res.status === 200) {
            this.$emit('refreshDraftList',this.draft.article_id)
          }
        }).catch((err) => {
            console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.draft-item
  width 100%
  padding 10px 15px
  border 1px solid rgb(222, 226, 230)
  border-radius 4px

.status
  color red

.fa-edit:hover
  color black

.fa-close:hover
  color black
</style>
