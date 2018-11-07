<template>
    <div class="home flex-column-center">

        <LoadingPage v-if="!articleSummaryListLoaded"></LoadingPage>

        <SearchBar inputLengthRatio="80%" is-mobile="yes" submit-slogan="Go!" class="search-bar common-padding" @submitSearchWords="receiveSearchWords"></SearchBar>


        <Jumbotron class="jumbotron" v-if="!isMobile&&articleSummaryListLoaded" :article_id="jumbotronArticleId"></Jumbotron>



        <transition-group name="list-complete" tag="div" class="home-article-list">
          <ArticleSummary :article=article
                          v-for="article in articleSummaryList"
                          :key="article.article_id"
                          class="list-complete-item"
          ></ArticleSummary>
        </transition-group>

        <Loading v-show="isLoading"></Loading>
        <Nomore v-show="currentPage==maxPage && articleSummaryListLoaded"></Nomore>
        <div class="blank-for-reload" v-show="!isLoading&&!(currentPage==maxPage)">
        </div>

        <BackToUp class="backtoup" ref="backtoup"></BackToUp>
      </div>



</template>

<script>
import ArticleSummary from './ArticleSummary.vue'
import LoadingPage from '../loading/LoadingPage.vue'
import Jumbotron from './Jumbotron.vue'
import Loading from '../loading/Loading.vue'
import Nomore from '../loading/Nomore.vue'
import ArticleApi from '../../api/article_api.js'
import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
import SearchBar from '../searchBar/SearchBar.vue'
import BackToUp from '../backToUp/BackToUp.vue'
import { mapState } from 'vuex'
export default {
  mixins: [ScrollRefreshMixin],
  data: function() {
    return {
      currentPage: 0,
      pageScale: 5,
      startIndex: 0,
      maxPage: 1,
      articleSummaryList: [],
      isLoading: false,
      isAllLoaded: false,
      articleSummaryListLoaded: false,
      jumbotronArticleId: 0
    }
  },
  components: {
    ArticleSummary,
    Loading,
    Nomore,
    LoadingPage,
    SearchBar,
    Jumbotron,
    BackToUp
  },
  created() {
    this.loadData(ArticleApi.getArticleSummaryListByLimitIndex, this.articleSummaryList, 'articleList')
    this.initPageEndRefresh()
  },
  mounted() {
    this.$nextTick(() => {
      this.initLocationOfBackToUp()
    })
  },
  inject:['isMobile'],
  computed: {
    ...mapState([
      'flagRefreshHome'
    ])
  },
  watch: {
    flagRefreshHome() {
      this.currentPage = 0
      this.articleSummaryList = []
      this.loadData()
    }
  },
  methods: {
    loadData() {
      if (this.currentPage === this.maxPage) {
        return
      }
      this.currentPage = this.currentPage + 1
      ArticleApi.getArticleSummaryListByLimitIndex(this.startIndex, this.pageScale).then((res) => {
        if (res.status === 200) {
          this.maxPage = res.data.maxPage
          this.startIndex = this.currentPage * this.pageScale
          this.articleSummaryList = this.articleSummaryList.concat(res.data.articleList)
          if(this.currentPage == 1) {
            this.jumbotronArticleId = this.articleSummaryList[0].article_id
          }
          if(this.isMobile == false && this.currentPage == 1) {
            this.articleSummaryList.splice(0,1)
          }
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
      }, 500)
    },
    initPageEndRefresh() {
      window.addEventListener('scroll', () => {
          var distanceToBottom = this.calculateDistanceToBottom()
          if (distanceToBottom < 30 && this.$route.path == '/routine/home') {
            this.throttle(this.reload, 400, 200)
          }
      })
    },
    receiveSearchWords(searchString) {
      if(searchString != ''){
        this.$router.push({path:'/routine/article_manage',query:{search_string: searchString}})
      }
    },
    initLocationOfBackToUp(){

      if(this.isMobile) {
        return
      }

        let windowInnerWidth = window.innerWidth
        let leftOfBackToUp
        if(windowInnerWidth > 850) {
          leftOfBackToUp = (windowInnerWidth - 750) * 0.5 - 50
        }
        this.$refs.backtoup.$el.style.left = leftOfBackToUp + 'px'
    }
  }
}
</script>

<style scoped lang="stylus">
.home {
  width 100%
  position relative
  min-height 500px
  /*display flex*/
}



.home-article-list
.jumbotron
  width 750px


@media(min-width: 750px){
  .home{
    padding-top 0px
  }
}

@media(max-width: 750px){
  .home-article-list
  .jumbotron{
    width 100%
  }
}

.blank-for-reload
  height 50px

.search-bar
  width 100%
  background white
  border-bottom 1px solid rgb(222, 226, 230)

.list-complete-item
  transition all 0.5s
  display inline-block

.list-complete-enter
.list-complete-leave-to
  opacity 0
  transform translateY(30px)

.list-complete-leave-active
  position absolute

.backtoup
  position fixed
  bottom  70px
</style>
