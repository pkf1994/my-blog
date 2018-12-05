<template>
  <div class="header common-padding flex-row-center" ref="navbar">
      <div class="logo font-llll common-padding" ref="logo">
        <div class="cursorp logo-img" @click="refresh"></div>
        <!--<div class="font-m font-normal font-song"> It's a Wonderful Life ...</div>-->
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed:{
    ...mapState([
      'scrollTopOfDocumentEl'
    ])
  },
  methods: {
    ...mapActions([
      'triggerFlagRefreshHome'
      ]),
    refresh() {
      this.$router.push({path:'/routine/home',query:{body_scroll_top: this.scrollTopOfDocumentEl}})
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
  padding-bottom 0
  .logo{
    height 100%
    width 750px
  }

}

.logo-img
  height 100%
  width 220px
  background-image url("../../assets/imaga/logo/logo.png")
  background-size 100% 100%
</style>
