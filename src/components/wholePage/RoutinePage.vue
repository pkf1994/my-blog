<template>
  <div id="routine-page">
    <div class="cover"></div>
    <Header ref="header"></Header>
    <div class="navbar-wrapper flex-row-center" ref="navbar">
      <Navbar></Navbar>
    </div>
    <div class="gap"></div>
    <div class="main-area flex-row-center" ref="mainArea">

     <!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view name="Home"></router-view>
        <router-view :key="$store.state.articlePageRouterStatus" name="ArticlePage"></router-view>
        <router-view name="ArticleEditorPage"></router-view>
        <router-view name="ArticleManage"></router-view>
      </keep-alive>
      </transition>-->
      <keep-alive>
        <router-view name="Home"></router-view>
      </keep-alive>


       <router-view :key="$store.state.articlePageRouterStatus" name="ArticlePage"></router-view>


      <keep-alive>
        <router-view name="ArticleEditorPage"></router-view>
      </keep-alive>

      <keep-alive>
        <router-view name="ArticleManage"></router-view>
      </keep-alive>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../header/Header.vue'
  import Navbar from '../header/Navbar.vue'
  import Footer from '../footer/Footer.vue'
  import CountDistanceToBodyMixin from '../mixin/CountDistanceToBody.vue'
  import CountDistanceToUpperEdge from '../../js/countDistanceToUpperEdge.js'
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

    },
    mounted() {
      this.bindScrollEvent()
      this.initDistanceOfNavbarToClientUpperEdge()
    },
    watch: {
      distanceOfNavbarToClientUpperEdge(newDistanceOfNavbarToClientUpperEdge, oldDistanceOfNavbarToClientUpperEdge) {
        let opacity = (70 - newDistanceOfNavbarToClientUpperEdge)/70
        this.$refs.navbar.style.backgroundColor = 'rgba(204,204,204,' + opacity + ')'
        this.$refs.header.$el.style.backgroundColor = 'rgba(204,204,204,' + opacity + ')'
      }
    },
    methods: {
      bindScrollEvent() {
        window.addEventListener('scroll', () => {
          this.distanceOfNavbarToClientUpperEdge = CountDistanceToUpperEdge.countDistanceToClientUpperEdge(this.$refs.navbar)
        })
      },
      initDistanceOfNavbarToClientUpperEdge() {
        this.distanceOfNavbarToClientUpperEdge = CountDistanceToUpperEdge.countDistanceToClientUpperEdge(this.$refs.navbar)
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
    z-index 1

  .gap
    width 100%
    height 7px

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
