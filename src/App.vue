<template>
  <div id="app">
    <div class="cover"></div>
    <Header ref="navbar"></Header>
    <div class="navbar-wrapper flex-row-center" ref="navbar">
      <Navbar></Navbar>
    </div>
    <div class="main-area flex-row-center" ref="mainArea">
      <keep-alive>
        <router-view name="Home"></router-view>
      </keep-alive>
      <router-view :key="$store.state.articlePageRouterStatus" name="ArticlePage"></router-view>
      <router-view name="ArticleEditorPage"></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import Navbar from './components/header/Navbar.vue'
import Footer from './components/footer/Footer.vue'
import CountDistanceToBodyMixin from './components/mixin/CountDistanceToBody.vue'
export default {
  mixins: [
    CountDistanceToBodyMixin
  ],
  data() {
    return {
      distanceOfNavbarToClientUpperEdge: 0
    }
  },
  components: {
    Header,
    Footer,
    Navbar
  },
  created() {
    this.init()
  },
  mounted() {
  },
  watch: {
    distanceOfNavbarToClientUpperEdge(newDistanceOfNavbarToClientUpperEdge, oldDistanceOfNavbarToClientUpperEdge) {

      let opacity = (70 - newDistanceOfNavbarToClientUpperEdge)/100

      this.$refs.navbar.style.backgroundColor = 'rgba(204,204,204,' + opacity + ')'
    }
  },
  methods: {
    countDistanceToClientUpperEdge(el) {
      let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let distanceToBody = this.countDistanceToBody(el)
      return distanceToBody - bodyScrollTop
    },
    init() {
      window.addEventListener('scroll', () => {
        this.distanceOfNavbarToClientUpperEdge = this.countDistanceToClientUpperEdge(this.$refs.navbar)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.main-area
  width 100vw
.navbar-wrapper
  width 100vw
  position sticky
  background rgba(204,204,204,0)
  top 0px
</style>
