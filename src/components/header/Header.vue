<template>
  <div class="header common-padding flex-row-center" ref="navbar">
      <div class="logo font-llll flex-column-center common-padding" ref="logo">
        <span class="cursorp" @click="refresh">远方有鱼</span>
        <div class="font-m font-normal"> It's a Wonderful Life ...</div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.uploadOffsetHeightOfNavbar()
  },
  methods: {
    ...mapActions([
      'appointOffsetHeightOfNavbar'
    ]),
    uploadOffsetHeightOfNavbar() {
      setTimeout(() => {
        this.appointOffsetHeightOfNavbar(this.$refs.navbar.offsetHeight)
      }, 500)
    },
    refresh() {
      location.reload()
    }
  }
}
</script>

<style scoped lang="stylus">

.header{
  z-index 1
  background #F7F7F7
  height 150px
  width 100vw
  .logo{
    height 100px
    width 750px
  }
}

</style>
