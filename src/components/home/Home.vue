<template>
    <div class="home flex-row-center max-width-750 common-padding">
          <LoadingPage v-if="!articleSummaryListLoaded"></LoadingPage>
          <ul style="width: 100%">
            <SearchBar inputLengthRatio="80%" is-mobile="yes" submit-slogan="Go!" class="search-bar" @submitSearchWords="receiveSearchWords"></SearchBar>
            <li v-for="article in articleSummaryList" :key="article.article_id">
              <ArticleSummary :article=article
              ></ArticleSummary>
            </li>
            <Loading v-show="isLoading"></Loading>
            <Nomore v-show="currentPage==maxPage && articleSummaryListLoaded"></Nomore>
            <div class="blank-for-reload" v-show="!isLoading&&!(currentPage==maxPage)">
            </div>
          </ul>
    </div>
</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
import LoadingPage from '../loading/LoadingPage.vue'
import Loading from '../loading/Loading.vue'
import Nomore from '../loading/Nomore.vue'
import ArticleApi from '../../api/article_api.js'
import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
import SearchBar from '../searchBar/SearchBar.vue'
import { mapState } from 'vuex'
export default {
  mixins: [ScrollRefreshMixin],
  data: function() {
    return {
      currentPage: 0,
      pageScale: 3,
      maxPage: 1,
      articleSummaryList: [],
      isLoading: false,
      isAllLoaded: false,
      articleSummaryListLoaded: false,
    }
  },
  components: {
    ArticleSummary,
    Loading,
    Nomore,
    LoadingPage,
    SearchBar
  },
  created() {
    this.loadData(ArticleApi.getArticleSummaryListByCurrentPageAndPageScale, this.articleSummaryList, 'articleList')
    this.initPageEndRefresh()
  },
  mounted() {
  },
  computed: {
    ...mapState([
      'flagRefreshHome'
    ])
  },
  watch: {
    flagRefreshHome() {
      this.currentPage = 0
      this.articleSummaryList = []
      this.loadData(ArticleApi.getArticleSummaryListByCurrentPageAndPageScale, this.articleSummaryList, 'articleList')
    }
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
          this.articleSummaryListLoaded = true
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
          if (distanceToBottom < 30 && this.$route.path == '/home.html') {
            this.throttle(this.reload, 400, 200)
          }
      })
    },
    receiveSearchWords(searchString) {
      if(searchString != ''){
        this.$router.push({path:'/article_manage',query:{search_string: searchString}})
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.home {
  width 750px
  background white
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

.search-bar
  padding-bottom 15px
  border-bottom 1px solid rgb(222, 226, 230)

</style>
