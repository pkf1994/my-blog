<template>
    <div class="home flex-row-center max-width-750">
          <ul>
            <li v-for="article in articleSummaryList" :key="article.article_id">
              <ArticleSummary :article=article
              ></ArticleSummary>
            </li>
            <Loading v-show="isLoading"></Loading>
            <Nomore v-show="currentPage==maxPage"></Nomore>
            <div class="blank-for-reload" v-show="!isLoading&&!(currentPage==maxPage)">
            </div>
          </ul>
    </div>
</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
import Loading from '../loading/Loading.vue'
import Nomore from '../loading/Nomore.vue'
import ClickForMore from '../loading/ClickForMore.vue'
import ArticleApi from '../../api/article_api.js'
import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
export default {
  mixins: [ScrollRefreshMixin],
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
    ArticleSummary,
    Loading,
    Nomore,
    ClickForMore
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
      ArticleApi.getArticleSummaryListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.maxPage = res.data.maxPage
          this.articleSummaryList = this.articleSummaryList.concat(res.data.articleList)
          this.isLoading = false
          console.log('reloading!!!!')
        }
      }, (err) => console.log(err))
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
        if (distanceToBottom < 10 && this.$route.path == '/home.html') {
          this.throttle(this.reload, 400, 200)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.home {
  .home-main-area {
    height 100vh
  }
}
@media(max-width: 750px){
  .home {
    width 100%
  }
}

.blank-for-reload
  height 50px

</style>
