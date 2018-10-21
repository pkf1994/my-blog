<template>
    <div class="draft common-padding">
      <div class="font-m font-bold headline">草稿</div>
      <div class="division"></div>
      <ul>
        <DraftItem class="draft-item" ref="draftitems"
                   v-for="draft in drafts"
                   :draft="draft"
                   :key="draft.article_id" @triggerEditingSlogan="initEditingSloganOfAllDraftItem()"></DraftItem>
      </ul>
      <Loading v-show="isLoading"></Loading>
      <Nomore v-show="currentPage==maxPage" msg="没有更多草稿"></Nomore>
      <div class="blank-for-reload" v-show="!isLoading&&!(currentPage==maxPage)">
      </div>
    </div>
</template>

<script>
  import DraftItem from './DraftItem.vue'
  import ArticleApi from '../../api/article_api.js'
  import Loading from '../loading/Loading.vue'
  import Nomore from '../loading/Nomore.vue'
  import ScrollRefreshMixin from '../mixin/ScrollRefreshMixin.vue'
  export default {
    mixins: [ScrollRefreshMixin],
    data() {
      return {
        drafts: [],
        currentPage: 0,
        pageScale: 3,
        maxPage: 1,
        isLoading: false,
        isAllLoaded: false
      }
    },
    components: {
      DraftItem,
      Loading,
      Nomore
    },
    created() {
      this.loadData()
      this.initPageEndRefresh()
    },
    methods: {
      loadData() {
        if (this.currentPage === this.maxPage) {
          return
        }
        this.currentPage = this.currentPage + 1
        ArticleApi.getDraftListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
          if (res.status === 200) {
            this.maxPage = res.data.maxPage
            this.drafts = this.drafts.concat(res.data.articleList)
            this.isLoading = false
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
          if (distanceToBottom < 10 && this.$route.path.match(/^\/article_edit\/\d+$/) != null) {
            this.throttle(this.reload, 400, 200)
          }
        })
      },
      initEditingSloganOfAllDraftItem() {
        for(let i = 0; i < this.$refs.draftitems.length; i++) {
          this.$refs.draftitems[i].isEditing = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
.headline
  margin 10px 0px

.draft-item
  margin-top 15px
</style>
