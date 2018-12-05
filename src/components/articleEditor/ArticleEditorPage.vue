<template>
    <div class="article-editor-page common-border common-padding">
      <ArticleEditor ref="articleEditor" :idOfEditingArticle="idOfEditingArticle" @refreshDrafts="refreshDrafts" class="article-editor"></ArticleEditor>
      <Drafts ref="drafts" class="drafts"></Drafts>
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
      mounted() {
        this.$nextTick(() => {
          this.initDraftsHeight()
        })
      },
      methods: {
        refreshDrafts() {
          this.$refs.drafts.refreshDraftListAfterSubmit()
        },
        initDraftsHeight() {
          let heightOfArticleEditor = getComputedStyle(this.$refs.articleEditor.$el).height
          if(window.innerWidth >= 750){
            this.$refs.drafts.$el.style.height = heightOfArticleEditor
          }

        }
      }
    }
</script>

<style scoped lang="stylus">
.article-editor-page
  background white

@media (max-width: 750px){
  .article-editor-page{
    width 100%
    .drafts{
      margin-top 20px
    }
  }
}

@media (min-width: 750px){
  .article-editor-page{
    width 1000px
    display flex
  .article-editor{
    width 70%
    }
  .drafts{
    width 30%
    margin-left 15px
    padding-left 15px
    border-left 1px solid rgb(222, 226, 230)
    }
  }
}

</style>
