<template>
  <div id="app">
    <div class="cover"></div>
    <navbar ref="navbar"></navbar>
    <div class="main-area" ref="mainArea">
      <router-view name="Home"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue'
import Headroom from 'headroom.js'
export default {
  components: {
    Navbar
  },
  mounted() {
    this.$nextTick(() => {
      this.setMainAreaMarginTop()
      if (document.body.clientWidth >= 750) {
        return
      }
      this.initHeadroom()
    })
  },
  methods: {
    initHeadroom() {
      var myElement = this.$refs.navbar.$el
      var headroom = new Headroom(myElement, {
        'tolerance': 10,
        'offset': 200,
        'classes': {
          'initial': 'animated',
          'pinned': 'slideInDown',
          'unpinned': 'slideOutUp'
        },
        'scroller': window
      })
      headroom.init()
    },
    setMainAreaMarginTop() {
      var heightOfNavbar = getComputedStyle(this.$refs.navbar.$el).height
      this.$refs.mainArea.style.paddingTop = heightOfNavbar
    }
  }
}
</script>

<style scoped lang="stylus">
.main-area
  width 100vw
</style>
