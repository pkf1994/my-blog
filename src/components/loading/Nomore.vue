<template>
  <div class="nomore flex-row-column-center">
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: '没有更多内容'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .nomore
    height 50px

</style>

