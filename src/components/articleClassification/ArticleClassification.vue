<template>
    <div class="article-classification">
      <div class="article-classification-headline font-bold">文章分类
      </div>
      <div class="article-classification-labellist">
        <div v-for="label in labelList" class="article-classification-item flex-row-column-center cursorp font-dark">{{label.article_label}}({{label.number}})</div>
      </div>
    </div>
</template>

<script>
  import ArticleApi from '../../api/article_api.js'
  export default {
    data() {
      return {
        labelList: ['杂谈', '技术', '随笔', '旅行', '生活']
      }
    },
    created() {
      this.loadLabelListData()
    },
    methods: {
      loadLabelListData() {
        ArticleApi.getArticleLabelData().then((res) => {
          if(res.status === 200) {
            this.labelList = res.data
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }

  }
</script>

<style scoped lang="stylus">
  .article-classification-headline
    line-height 2rem
    border-top 1px solid  rgb(222, 226, 230)
    padding-top 15px

  .article-classification-labellist
    display flex
    flex-wrap wrap

  .article-classification-item
    height 2rem
    border 1px solid rgb(222, 226, 230)
    border-radius 5px
    padding 0px 10px
    margin-right 5px
    margin-bottom 5px

  .article-classification-item:hover
    background rgb(222, 226, 230)
    transition 0.5s ease all

</style>
