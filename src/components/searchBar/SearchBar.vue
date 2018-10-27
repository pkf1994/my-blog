<template>
    <div>
      <input class="search-bar-input" type="text" v-model="searchString" placeholder="标题、分类、作者"><button class="search-bar-button" @click="submitSearchWord">Search</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        searchString: ''
      }
    },
    methods: {
      submitSearchWord() {
        if(this.searchString.trim() == ''){
          return
        }
        this.$emit('submitSearchWords', this.searchString)
      }
    }
  }
</script>

<style scoped lang="stylus">
.search-bar-input
  width 70%
  margin-right 5%
  height 2rem
  padding-left 5px
  line-height 2rem

.search-bar-button
  width 25%
  overflow hidden
  height 2rem
  padding 0px
  color white
  background grey
  border 1px solid grey

.search-bar-button:hover
  background #6c757d
</style>
