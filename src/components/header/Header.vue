<template>
  <div class="header common-padding flex-row-center" ref="navbar">
      <div class="logo font-llll common-padding" ref="logo">
        <span class="cursorp font-song" @click="refresh">远方有鱼</span>
        <div class="font-m font-normal font-song"> It's a Wonderful Life ...</div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'triggerFlagRefreshHome'
      ]),
    refresh() {
      this.$router.push('/home.html')
      setTimeout(() => {
        this.triggerFlagRefreshHome()
      },200)
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
  position relative
  .logo{
    height 100px
    width 750px
  }

}

</style>
