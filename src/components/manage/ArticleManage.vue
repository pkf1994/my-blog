<template>
    <div class="article-manage common-padding">
        <LoadingPage v-if="!articleItemsLoaded"></LoadingPage>

        <div class="article-manage-list" ref="articleManageList">
          <div class="article-manage-list-inner" ref="inner">
            <div class="article-manage-headline font-l font-bold">{{headline}}</div>
            <div class="article-manage-head  font-dark" v-if="!isMobile">
              <span class="article-manage-title">文章标题</span>
              <span class="article-manage-author">作者</span>
              <span class="article-manage-label flex-row-center">标签</span>
              <span class="article-manage-releasetime flex-row-center">发布时间</span>
              <span class="article-manage-operation flex-row-center">操作</span>
            </div>
            <div v-if="isMobile" class="article-manage-head-mobile font-bold">文章列表</div>
            <ArticleItem v-for="article in articleList"
                         :article="article"
                         :key="article.article_id"
                         v-if="!isMobile">
            </ArticleItem>
            <ArticleItemMobile v-for="article in articleList"
                               :article="article"
                               :key="article.article_id"
                               v-if="isMobile">
            </ArticleItemMobile>
          </div>
            <Pagination :max-page="maxPage"
                        v-if="maxPage > 1"
                        @changeCurrentPage="changeCurrentPage"
                        class="article-manage-pagination"
                        ref="pagination"
            ></Pagination>
        </div>




        <div class="article-manage-sidebar" v-if="!isMobile">
          <SearchBar @submitSearchWords="(searchString) => {
            searchStringFromSearchBar = searchString;
            paginationPoint = 'search';
            currentPage = 1;
            $refs.pagination.currentPage = 1;
           loadArticleItemListBySearchWords(searchString)
          }"></SearchBar>
          <ArticleFiling class="article-filing" @submitArticleFilingDate="loadArticleItemListByFilingDate"></ArticleFiling>
          <ArticleClassification class="article-classification"></ArticleClassification>
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
        searchStringFromSearchBar: ''
      }
    },
    computed: {
      ...mapState([
        'offsetHeightOfHeader',
        'offsetHeightOfNavbar'
      ])
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
      this.initPageHeight()
    },
    watch: {
      currentPage() {
        if(this.paginationPoint == 'search'){
          this.loadArticleItemListBySearchWords(this.searchStringFromSearchBar)
        }
        if(this.paginationPoint == 'common'){
          this.loadData()
        }
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
      loadArticleItemListBySearchWords(searchString) {
        ArticleApi.getArticleItemListBySearchWords(this.currentPage, this.pageScale, searchString).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
            this.headline = '搜索结果(' + this.articleList.length + ')'
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      loadArticleItemListByFilingDate() {
        ArticleApi.getArticleItemListByFilingDate(this.currentPage, this.pageScale, searchString).then((res) => {
          if(res.status === 200) {
            this.articleList = res.data.articleList
            this.maxPage = res.data.maxPage
            this.articleItemsLoaded = true
            this.handleArticleList()
            this.headline = '搜索结果(' + this.articleList.length + ')'
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      initPageHeight() {
        window.addEventListener('load', () => {
          let bodyEl = document.documentElement || document.body
          let clientHeight = bodyEl.clientHeight
          let pageHeight = clientHeight - this.offsetHeightOfHeader - this.offsetHeightOfNavbar
          this.$refs.inner.style.minHeight = pageHeight + 'px'
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .article-manage
    width 1100px
    background white
    display flex

  .article-manage-headline
    margin-bottom 15px

  .article-manage-list
    width 70%


  .article-manage-sidebar
    width 30%
    height 100%
    margin-left 10px
    padding-left 10px
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

</style>
