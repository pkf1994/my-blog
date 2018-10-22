<template>
    <div class="draft-item">
      <div class="draft-title font-s font-bold flex-row-space-between">
        <span class="cursorp" @click="redirectToEditPage">{{draft.article_title}}</span>
        <span class="operation font-normal font-dark">
          <span class="cursorp" @click="redirectToEditPage" v-if="!isEditing">编辑</span><span class="status" v-if="isEditing">编辑中</span>&nbsp;|
          <span class="cursorp" @click="deleteThisDraft">删除</span>
        </span>
      </div>
      <div>
        <span class="savetime font-s font-dark">最后一次提交：{{draft.article_releaseTime}}</span>
      </div>
    </div>
</template>

<script>
  import getDateDiff from '../../js/getDateDiff.js'
  import ArticleApi from '../../api/article_api.js'
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
        this.$router.push('/article_edit/' + this.draft.article_id)
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
.status
  color red
</style>
