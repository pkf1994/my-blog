<template>
    <div class="draft-item">
      <div class="draft-title font-s font-bold"><span class="cursorp" @click="redirectToEditPage">{{draft.article_title}}</span></div>
      <div>
        <span class="savetime font-s font-dark" v-if="!isEditing">{{draft.article_releaseTime}}</span>
        <span class="status" v-if="isEditing">编辑中</span>
      </div>
    </div>
</template>

<script>
  import getDateDiff from '../../js/getDateDiff.js'
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
      }
    }
  }
</script>

<style scoped lang="stylus">
.status
  color red
</style>
