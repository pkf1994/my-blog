<template>
  <div id="app">
    <div class="cover"></div>
    <Header ref="navbar"></Header>
    <div class="main-area flex-row-center" ref="mainArea">
      <keep-alive>
        <router-view name="Home"></router-view>
      </keep-alive>
      <router-view :key="$store.state.articlePageRouterStatus" name="ArticlePage"></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/navbar/Header.vue'
import Footer from './components/footer/Footer.vue'
import Headroom from 'headroom.js'
export default {
  components: {
    Header,
    Footer
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
        'tolerance': 5,
        'offset': 100,
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
