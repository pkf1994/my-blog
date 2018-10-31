<template>
    <div class="article-manage common-padding">
        <LoadingPage v-if="!articleItemsLoaded"></LoadingPage>

        <div class="article-manage-list" ref="articleManageList" v-show="articleItemsLoaded">
          <div class="article-manage-list-inner" ref="inner">
            <div class="search-bar-mobile" v-if="isMobile">
              <SearchBar inputLengthRatio="80%" submit-slogan="Go!" is-mobile="yes" @submitSearchWords="receiveSearchWords" ref="searchBarMobile"></SearchBar>
            </div>
            <div class="article-manage-headline font-l font-bold">{{headline}}</div>
            <div class="article-manage-head  font-dark" v-if="!isMobile">
              <span class="article-manage-title">文章标题</span>
              <span class="article-manage-author">作者</span>
              <span class="article-manage-label flex-row-center">标签</span>
              <span class="article-manage-releasetime flex-row-center">发布时间</span>
              <span class="article-manage-operation flex-row-center">操作</span>
            </div>

            <transition-group name="list-complete" tag="div">
              <ArticleItem class="list-complete-item"
                           v-for="article in articleList"
                           :article="article"
                           :key="article.article_id"
                           v-if="!isMobile"
                            @submitArticleLabel="receiveArticleLabel">
              </ArticleItem>
            </transition-group>

            <transition-group name="list-complete" tag="div">
              <ArticleItemMobile class="list-complete-item"
                                 v-for="article in articleList"
                                 :article="article"
                                 :key="article.article_id" @deleted="afterDeleteArticle"
                                 v-if="isMobile">
              </ArticleItemMobile>
            </transition-group>
          </div>
            <Pagination :max-page="maxPage"
                        @changeCurrentPage="changeCurrentPage"
                        class="article-manage-pagination"
                        ref="pagination"
            ></Pagination>
        </div>




        <div class="article-manage-sidebar" v-if="!isMobile && articleItemsLoaded">
          <SearchBar @submitSearchWords="receiveSearchWords" ref="searchBar" is-mobile="no"></SearchBar>
          <ArticleFiling class="article-filing" @submitArticleFilingDate="receiveArticleFilingDate" ref="articleFiling"></ArticleFiling>
          <ArticleClassification class="article-classification" @submitArticleLabel="receiveArticleLabel" ref="articleClassification"></ArticleClassification>
          <CommentLast class="comment-last"></CommentLast>
        </div>

    </div>
</template>

<script>
  import ArticleItem from './ArticleItem.vue'
  import LoadingPage from '../loading/LoadingPage.vue'
  import ArticleItemMobile from './ArticleItemMobile.vue'
  import ArticleApi from '../../api/article_api.js'
  import Pagination from '../pagination/Pagination.vue'
  import SearchBar from '../searchBar/SearchBar.vue'
  import ArticleFiling from '../articleFiling/ArticleFiling.vue'
  import ArticleClassification from '../articleClassification/ArticleClassification.vue'
  import CommentLast from '../commentLast/CommentLast.vue'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        articleList: [],
        currentPage: 0,
        pageScale: 10,
        maxPage: 1,
        isMobile: false,
        articleItemsLoaded: false,
        headline: '所有文章',
        paginationPoint: 'common',
        searchStringFromSearchBar: '',
        countOfArticle: 0
      }
    },
    computed: {
      ...mapState([
        'offsetHeightOfHeader',
        'offsetHeightOfNavbar'
      ]),
      querySearchString() {
        return this.$route.query.search_string
      },
      queryArticleLabel() {
        return this.$route.query.article_label
      }
    },
    components: {
      ArticleItem,
      Pagination,
      ArticleItemMobile,
      LoadingPage,
      SearchBar,
      ArticleFiling,
      ArticleClassification,
      CommentLast
    },
    created() {
      this.currentPage ++
      this.judgeIfMobile()
    },
    mounted() {
      this.handleRouterQuery()
    },
    updated() {
      /*this.handleQuerySearchString() console.log("===")*/
    },
    watch: {
      currentPage() {
        if(this.paginationPoint == 'search'){
          this.loadArticleItemListBySearchWords(this.searchStringFromSearchBar)
        }
        if(this.paginationPoint == 'common'){
          this.loadData()
        }
      },
      querySearchString() {
        this.handleRouterQuery()
      },
      queryArticleLabel() {
        this.handleRouterQuery()
      }
    },
    methods: {
      loadData() {
        ArticleApi.getArticleSummaryListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
          }
        })
      },
      handleArticleList() {
        this.articleList.forEach((item, index) => {
          if(index % 2 == 0) {
            item.colorful = true
          }else{
            item.colorful = false
          }
        })
      },
      changeCurrentPage(newPage) {
        this.currentPage = newPage
      },
      judgeIfMobile() {
        let bodyEl = document.documentElement || document.body
        if(bodyEl.offsetWidth > 750) {
          this.isMobile = false
        }else{
          this.isMobile = true
        }
      },
      receiveSearchWords(searchString) {
        this.initSideBar('searchBar')
        if(searchString != ''){
          this.searchStringFromSearchBar = searchString
          this.paginationPoint = 'search'
          this.currentPage = 1
          this.$refs.pagination.currentPage = 1
          this.loadArticleItemListBySearchWords(searchString)
        }else{
          this.paginationPoint = 'common'
          this.currentPage = 1
          this.$refs.pagination.currentPage = 1
          this.headline = '所有文章'
          this.loadData()
        }
      },
      loadArticleItemListBySearchWords(searchString) {
        ArticleApi.getArticleItemListBySearchWords(this.currentPage, this.pageScale, searchString).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
            this.countOfArticle = res.data.countOfAllArticleBySearchWords
            this.headline = '搜索结果'
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      receiveArticleFilingDate(selectedYear, selectedMonth){
        this.initSideBar('articleFiling')
        this.paginationPoint = 'articleFiling'
        this.currentPage = 1
        this.$refs.pagination.currentPage = 1
        this.loadArticleItemListByFilingDate(selectedYear, selectedMonth)
      },
      loadArticleItemListByFilingDate(selectedYear, selectedMonth) {
        ArticleApi.getArticleItemListByFilingDate(this.currentPage, this.pageScale, selectedYear, selectedMonth).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
            this.countOfArticle = res.data.countOfAllArticleByFilingDate
            this.headline = '归档于' + selectedYear + '年' + selectedMonth + '月的所有文章';
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      receiveArticleLabel(label) {
        this.initSideBar('articleClassification')
        this.paginationPoint = 'articleLabel'
        this.currentPage = 1
        this.$refs.pagination.currentPage = 1
        this.loadArticleItemListByLabel(label)
      },
      loadArticleItemListByLabel(label) {
        ArticleApi.getArticleItemListByLabel(this.currentPage, this.pageScale, label).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
            this.countOfArticle = res.data.countOfAllArticleByLabel
            this.headline = '分类为 [' + label + '] 的所有文章'
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      initSideBar(currentIndex) {
        if(currentIndex != 'searchBar' && this.$refs.searchBar != undefined) {
          this.$refs.searchBar.searchString = ''
        }
        if(this.isMobile == true) {
          return
        }
        if(currentIndex != 'articleFiling') {
          if(this.$refs.articleFiling != undefined) {
            this.$refs.articleFiling.selectedYear = ''
          }
          if(this.$refs.articleFiling != undefined) {
            this.$refs.articleFiling.selectedMonth = ''
          }
        }
        if(currentIndex != 'articleClassification' && this.$refs.articleClassification != undefined) {
          this.$refs.articleClassification.currentLabel = ''
        }
      },
      handleRouterQuery() {
        if(this.$route.query.search_string != undefined) {
          this.receiveSearchWords(this.querySearchString)
        }
        if(this.$route.query.article_label != undefined) {
          this.receiveArticleLabel(this.queryArticleLabel)
        }
      },
      afterDeleteArticle(article_id){
        this.articleList.forEach((item, index) => {
          if(item.article_id == article_id){
            setTimeout(() => {
              this.articleList.splice(index,1)
              this.countOfArticle --
            },1000)

          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .article-manage
    width 1000px
    background white
    display flex

  .article-manage-headline
    margin-bottom 15px

  .article-manage-list
    width 70%

  .article-manage-list-inner
    min-height 650px

  .article-manage-sidebar
    width 30%
    height 100%
    margin-left 15px
    padding-left 15px
    border-left 1px solid rgb(222, 226, 230)

  @media(max-width: 750px){
    .article-manage {
      width 100%
      .article-manage-list{
        width 100%
      }
    }
  }

  .article-manage-head
  .article-manage-head-mobile
    display flex
    width 100%
    padding-bottom 15px
    border-bottom 2px solid rgb(222, 226, 230)

  .article-manage-title
    width 50%


  .article-manage-author
    width 15%


  .article-manage-label
    width 10%


  .article-manage-releasetime
    width 15%

  .article-manage-operation
    width 10%

  .article-manage-pagination
    margin-top 15px

  .article-filing
  .article-classification
  .comment-last
    margin-top 15px

  .search-bar-mobile
    padding-bottom 15px
    margin-bottom 15px
    border-bottom 1px solid #dee2e6

  .list-complete-item
    width 100%
    transition all 0.5s
    display inline-block

  .list-complete-enter
  .list-complete-leave-to
    opacity 0
    transform translateX(30px)

  .list-complete-leave-active
    position absolute

</style>
