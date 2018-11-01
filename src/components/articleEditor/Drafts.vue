<template>
    <div class="draft">
      <div class="font-m font-bold headline">草稿</div>
      <ul>
        <transition-group name="list-complete" tag="div">
        <DraftItem class="draft-item list-complete-item " ref="draftitems"
                   v-for="draft in drafts"
                   :draft="draft"
                   :key="draft.article_id"
                   @triggerEditingSlogan="initEditingSloganOfAllDraftItem()"
                   @refreshDraftList="refreshDraftListAfterDelete"></DraftItem>
        </transition-group>
      </ul>
      <div class="division"></div>
      <Loading v-show="isLoading"></Loading>
      <ClickForMore v-show="!(maxPage==currentPage)&&!isLoading" @click="reload"></ClickForMore>
      <Nomore v-show="maxPage==currentPage">没有更多内容</Nomore>
    </div>
</template>

<script>
  import DraftItem from './DraftItem.vue'
  import ArticleApi from '../../api/article_api.js'
  import Loading from '../loading/Loading.vue'
  import Nomore from '../loading/Nomore.vue'
  import ClickForMore from '../loading/ClickForMore.vue'
  export default {
    data() {
      return {
        drafts: [],
        currentPage: 0,
        pageScale: 7,
        maxPage: 1,
        isLoading: false,
        isAllLoaded: false
      }
    },
    components: {
      DraftItem,
      Loading,
      Nomore,
      ClickForMore
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        if (this.currentPage === this.maxPage) {
          return
        }
        this.currentPage = this.currentPage + 1
        return ArticleApi.getDraftListByCurrentPageAndPageScale(this.currentPage, this.pageScale).then((res) => {
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
      },
      initEditingSloganOfAllDraftItem() {
        for(let i = 0; i < this.$refs.draftitems.length; i++) {
          this.$refs.draftitems[i].isEditing = false
        }
      },
      refreshDraftListAfterDelete(draftItemToBeDelete) {
        this.drafts.forEach((item, index) => {
          if(item.article_id === draftItemToBeDelete) {
            this.drafts.splice(index,1)
          }
        })
      },
      refreshDraftListAfterSubmit(){
        this.drafts = []
        this.currentPage = 0
        this.loadData().then(() => {
          this.$refs.draftitems[0].isEditing = true
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.draft
  overflow-x hidden
  overflow-y auto

.draft::-webkit-scrollbar
  width 10px
  height 1px

.draft::-webkit-scrollbar-thumb
  border-radius 10px
  -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
  background rgb(128, 128, 128);

.draft::-webkit-scrollbar-track
  box-shadow inset 0 0 5px rgba(0,0,0,0.2);
  border-radius 10px;
  background #EDEDED;

.headline
  margin-bottom 5px
  padding-bottom 5px

.draft-item
  margin-bottom 15px


@media(min-width: 750px) {
  .draft-item{
    margin-right 10px
  }
}
.list-complete-item
  transition all 0.5s

.list-complete-enter
.list-complete-leave-to
  opacity 0
  transform translateX(30px)

.list-complete-leave-active
  position absolute
</style>
