<template>
    <div class="home flex-row-center">
      <div class="home-main-area" ref="scrollWindow">
          <ul class="content">
            <li v-for="article in articleSummaryList" :key="article.article_id">
              <ArticleSummary :article=article
              ></ArticleSummary>
            </li>
            <div class="loading-font flex-row-center" v-show="isLoading">
              <i class="fa fa-spinner fa-pulse fa-2x"></i>
            </div>
            <div class="loading-font flex-row-center" v-show="currentPage==maxPage">
              没有更多内容
            </div>
            <div class="loading-font flex-row-center" v-show="!isLoading">
              &nbsp;
            </div>
          </ul>
      </div>
    </div>
</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
import ArticleApi from '../../api/article_api.js'
import Throttle from '../mixin/Throttle.vue'
export default {
  mixins: [Throttle],
  data: function() {
    return {
      currentPage: 0,
      pageScale: 3,
      maxPage: 1,
      articleSummaryList: [],
      isLoading: false,
      isAllLoaded: false
    }
  },
  components: {
    ArticleSummary
  },
  created() {
    this.loadData()
    this.initPageEndRefresh()
  },
  mounted() {
  },
  methods: {
    loadData() {
      if (this.currentPage === this.maxPage) {
        return
      }
      this.currentPage = this.currentPage + 1
      ArticleApi.getArticleSummaryByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.maxPage = res.data.maxPage
          this.articleSummaryList = this.articleSummaryList.concat(res.data.articleList)
          this.isLoading = false
          console.log('reloading!!!!')
        }
      }, (err) => console.log(err))
    },
    calculateDistanceToBottom() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      var distanceToBottom = scrollHeight - scrollTop - clientHeight
      return distanceToBottom
    },
    reload() {
      if (!(this.maxPage === this.currentPage)) {
        this.isLoading = true
      }
      setTimeout(() => {
        this.loadData()
      }, 2000)
    },
    initPageEndRefresh() {
      window.addEventListener('scroll', () => {
        var distanceToBottom = this.calculateDistanceToBottom()
        if (distanceToBottom < 10) {
          this.throttle(this.reload, 400, 200)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.home {
  width 100%
  .home-main-area {
    height 100vh
    max-width 750px
  }
}

.loading-font
  padding 25px
</style>
