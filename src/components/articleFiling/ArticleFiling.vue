 <template>
    <div class="article-filing">
      <div class="article-filing-headline flex-row-space-between font-bold">文章归档
      </div>
      <div class="date-selector">
        <select class="year-selector font-m" v-model="selectedYear">
          <option v-for="articleFilingItem in articleFilingList" :value="articleFilingItem.year">{{articleFilingItem.year}}</option>
        </select>
        <span>年</span>
        <select class="month-selector font-m" v-model="selectedMonth">
          <option v-for="articleFilingMonthItem in articleFilingObject[selectedYear]" :value="articleFilingMonthItem">{{articleFilingMonthItem}}</option>
        </select>
        <span>月</span>
        <button class="article-filing-button" @click="throttleSubmitArticleFilingData">
          Go!
        </button>
      </div>


    </div>
</template>

<script>
  import ArticleApi from '../../api/article_api.js'
  import ThrottleMixin from '../mixin/ThrottleMixin.vue'
  export default {
    mixins:[ThrottleMixin],
    data() {
      return {
        articleFilingObject: {},
        articleFilingList: [],
        selectedYear:'',
        selectedMonth:'',
        monthList:[]
      }
    },
    created() {
      this.loadArticleFilingData()
    },
    methods: {
      loadArticleFilingData() {
        ArticleApi.getArticleFilingData().then((res) => {
          if(res.status === 200) {
            this.articleFilingObject = res.data
            Object.keys(res.data).forEach((key) => {
              let articleFilingItem = {
                year: key,
                month: res.data[key]
              }
              this.articleFilingList = this.articleFilingList.concat(articleFilingItem)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      throttleSubmitArticleFilingData() {
        this.throttle(this.submitArticleFilingData, 500, 0)
      },
      submitArticleFilingData() {
        if(this.selectedYear == '' || this.selectedMonth == ''){
          return
        }
        this.$emit('submitArticleFilingDate',this.selectedYear, this.selectedMonth)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .article-filing-headline
    line-height 2rem
    border-top 1px solid  rgb(222, 226, 230)
    padding-top 15px

  .year-selector
  .month-selector
    height 2rem

  .article-filing-button
    width 25%
    overflow hidden
    height 2rem
    padding 0px
    color white
    background grey
    border 1px solid grey
    float right

  .article-filing-button:hover
    background #6c757d
</style>
