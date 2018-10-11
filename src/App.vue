<template>
  <div id="app">
    <div class="cover"></div>
    <Header ref="navbar"></Header>
    <div class="navbar flex-row-center">
      <Navbar></Navbar>
    </div>
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
import Header from './components/header/Header.vue'
import Navbar from './components/header/Navbar.vue'
import Footer from './components/footer/Footer.vue'
export default {
  components: {
    Header,
    Footer,
    Navbar
  },
  mounted() {
  },
  methods: {
    setMainAreaMarginTop() {
    }
  }
}
</script>

<style scoped lang="stylus">
.main-area
  width 100vw
.navbar
  width 100vw
  position sticky
  top 0px
</style>
