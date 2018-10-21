<template>
    <div class="article-editor-page">
      <ArticleEditor :idOfEditingArticle="idOfEditingArticle"></ArticleEditor>
      <Drafts></Drafts>
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
        }
    }
</script>

<style scoped lang="stylus">
.article-editor-page
  width 750px
  background white
</style>
