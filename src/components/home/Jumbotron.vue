<template>
    <div class="jumbotron" ref="jumbotron">

      <div class="jumbotron-imgs">
        <div class="jumbotron-img cursorp" @click="goToTheArticle" ref="jumbImgA">

        </div>
        <div class="jumbotron-img cursorp" @click="goToTheArticle" ref="jumbImg2">

        </div>
        <div class="jumbotron-img cursorp" @click="goToTheArticle" ref="jumbImg3">

        </div>
        <div class="jumbotron-img cursorp" @click="goToTheArticle" ref="jumbImg4">

        </div>
      </div>

      <div class="jumbotron-info">
        <div class="jumbotron-title cursorp font-lll font-bold" @click="goToTheArticle">{{article.article_title}}</div>
        <!--<div class="jumbotron-author font-m">作者: {{article.article_author}}</div>-->
        <div class="jumbotron-summary cursorp font-m" @click="goToTheArticle">{{article.article_summary}}</div>
      </div>

      <div class="jumbotron-info-other font-s font-lighter flex-column-center">
        <div class="jumbotron-author">作者: {{article.article_author}}</div>
        <div class="jumbotron-label ">分类: <span class="cursorp" @click="submitLabel">{{article.article_label}}</span></div>
        <button class="jumbotron-button font-s" @click="goToTheArticle">查看全文</button>
      </div>

      <div class="division jumbotron-division"></div>
    </div>
</template>

<script>
  import ArticleApi from '../../api/article_api.js'
  export default {
    props: {
      article_id: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        article: {},
        imgUrls: []
      }
    },
    created() {
      if(this.article_id != 0) {
        this.getArticleData().then(() => {
          this.extractImageUrl()
          this.handleSummary()
        })
      }
    },
    watch:{
      article_id(newArticleId) {
        if(newArticleId != 0) {
          this.getArticleData().then(() => {
            this.extractImageUrl()
            this.handleSummary()
          })
        }
      }
    },
    methods: {
      getArticleData() {
        return ArticleApi.getArticleById(this.article_id).then((res) => {
          if(res.status === 200){
            this.article = res.data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      extractImageUrl() {
        var el = document.createElement('html')

        el.innerHTML = this.article.article_content

        for(var i = 0; i < el.getElementsByTagName('img').length; i++) {
         if(i < 4) {
           this.imgUrls = this.imgUrls.concat(el.getElementsByTagName('img')[i].src)
         }
        }

          this.$refs.jumbImgA.style.backgroundImage = "url('" + this.imgUrls[0] + "')"
          this.$refs.jumbImgA.style.backgroundRepeat = 'no-repeat'
          this.$refs.jumbImgA.style.backgroundPosition = 'center'
          this.$refs.jumbImgA.style.backgroundSize = '100% 100%'

          this.$refs.jumbImg2.style.backgroundImage = "url('" + this.imgUrls[1] + "')"
          this.$refs.jumbImg2.style.backgroundRepeat = 'no-repeat'
          this.$refs.jumbImg2.style.backgroundPosition = 'center'
          this.$refs.jumbImg2.style.backgroundSize = '100% 100%'

          this.$refs.jumbImg3.style.backgroundImage = "url('" + this.imgUrls[2] + "')"
          this.$refs.jumbImg3.style.backgroundRepeat = 'no-repeat'
          this.$refs.jumbImg3.style.backgroundPosition = 'center'
          this.$refs.jumbImg3.style.backgroundSize = '100% 100%'

          this.$refs.jumbImg4.style.backgroundImage = "url('" + this.imgUrls[3] + "')"
          this.$refs.jumbImg4.style.backgroundRepeat = 'no-repeat'
          this.$refs.jumbImg4.style.backgroundPosition = 'center'
          this.$refs.jumbImg4.style.backgroundSize = '100% 100%'

        /*if(el.getElementsByTagName('img').length > 0){
          el.getElementsByTagName('img').forEach((item,index) => {
              if(index < 4) {
                this.imgUrls.concat(item.src)
              }
          })
        }
        this.$refs.jumbImg1.style.backgroundImage = 'url(' + this.imgUrls[0] + '); background-repeat:no-repeat; background-size:100% 100%;'*/
      },
      handleSummary() {
        let idx = this.article.article_summary.indexOf('。')
        this.article.article_summary = this.article.article_summary.substring(0, idx + 1)
      },
      goToTheArticle() {
        this.$router.push('/routine/article/' + this.article_id)
      },
      submitLabel() {
        this.$router.push({path:'/routine/article_manage',query:{article_label: this.article.article_label}})
      }
    }
  }
</script>

<style scoped lang="stylus">
.jumbotron
  height 400px
  position relative
  background rgba(204, 204, 204, 0.25)
  border-radius 4px
  .jumbotron-info
  .jumbotron-imgs
  .jumbotron-info-other
  .jumbotron-division
    position absolute

.jumbotron-imgs
  display flex
  flex-direction row-reverse
  flex-wrap wrap
  width 370px
  top 30px
  right 25px

.jumbotron-img
  width 150px
  height 100px
  margin 10px
  border-radius 4px
  transition all 0.5s ease

.jumbotron-img:hover
  transform scale(1.1)


.jumbotron-info
  width 320px
  top 70px
  left 30px

.jumbotron-title
.jumbotron-summary
  margin 20px 0px

.jumbotron-division
  bottom 110px
  border-bottom-color rgba(0, 0, 0, 0.1)
  width 90%
  left 5%

.jumbotron-info-other
  bottom 15px
  right 30px

.jumbotron-author
.jumbotron-label
.jumbotron-button
  margin 2px
</style>
