<template>
    <div class="article-editor-page">
      <ArticleEditor :idOfEditingArticle="idOfEditingArticle" @refreshDrafts="refreshDrafts"></ArticleEditor>
      <Drafts ref="drafts"></Drafts>
    </div>
</template>

<script>
    import ArticleEditor from './ArticleEditor.vue'
    import Drafts from './Drafts.vue'
    export default {
        props: {
          idOfEditingArticle: {
            default: 0
          }
        },
        components: {
          ArticleEditor,
          Drafts
        },
      methods: {
        refreshDrafts() {
          this.$refs.drafts.refreshDraftListAfterSubmit()
        }
      }
    }
</script>

<style scoped lang="stylus">
.article-editor-page
  width 750px
  background white
</style>
