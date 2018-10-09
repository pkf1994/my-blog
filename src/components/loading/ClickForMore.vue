<template>
  <div class="click-for-more flex-row-column-center">
    <span @click="$emit('click')" class="cursorp">点击加载更多</span>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="stylus">
  .click-for-more
    height 50px
</style>

