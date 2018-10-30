<template>
    <div ref="searchBar" v-if="show">
      <input class="search-bar-input" ref="searchBarInput" type="text" v-model="searchString" @keydown="checkKeyNumber" placeholder="标题、分类、作者"><button ref="button" class="search-bar-button" @click="throttleSubmitSearchWord" >{{submitSlogan}}</button>
    </div>
</template>

<script>
  import ThrottleMixin from '../mixin/ThrottleMixin.vue'
  export default {
    mixins: [ThrottleMixin],
    props: {
      inputLengthRatio: {
        type: String,
        default: '70%'
      },
      submitSlogan: {
        type: String,
        default: 'Search'
      },
      isMobile: {
        type: String,
        default: 'no'
      },
      width: {
        type: String,
        default:''
      }
    },
    data() {
      return {
        searchString: '',
        show: true
      }
    },
    mounted() {
      this.initSearchBarSize()
    },
    methods: {
      throttleSubmitSearchWord() {
        this.throttle(this.submitSearchWord, 500, 0)
      },
      submitSearchWord() {
        this.$emit('submitSearchWords', this.searchString.trim())
      },
      checkKeyNumber(e) {
        if(e.keyCode == 108 || e.keyCode == 13 ) {
          this.submitSearchWord()
        }
      },
      initSearchBarSize() {
          this.$refs.searchBarInput.style.width = this.inputLengthRatio
          this.$refs.button.style.width = (100 - parseFloat(this.inputLengthRatio) - 5) + '%'
          let clientWidth = window.innerWidth
          if(this.isMobile == 'yes') {
            if(clientWidth >= 750) {
              this.show = false
            }
            this.$refs.searchBarInput.className = 'search-bar-input font-m'
            this.$refs.searchBarInput.style.height = '2.5rem'
            this.$refs.button.className = 'search-bar-button font-m'
            this.$refs.button.style.height = '2.5rem'

          }else{
            if(clientWidth <= 750) {
              console.log(clientWidth)
              this.show = false
              console.log()
            }else{
              this.show = true
            }
          }
          if(this.width != ''){
            this.$refs.searchBar.style.width = this.width + 'px'
          }
      }
    }
  }
</script>

<style scoped lang="stylus">
.search-bar-input
  margin-right 5%
  height 2rem
  padding-left 5px
  line-height 2rem

.search-bar-button
  overflow hidden
  height 2rem
  padding 0px
  color white
  background grey
  border 1px solid grey

.search-bar-button:hover
  background #6c757d
</style>
