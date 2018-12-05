<template>
  <div id="app">
    <router-view name="RoutinePage"/>
    <router-view name="LoginPage"/>
    <Notice></Notice>
  </div>
</template>

<script>
import RoutinePage from './components/wholePage/RoutinePage.vue'
import Notice from './components/notice/Notice.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    RoutinePage,
    Notice
  },
  provide:{
    isMobile: window.innerWidth > 750 ? false : true
  },
  computed: {
    ...mapState(['scrollTopOfDocumentEl'])
  },
  created() {
    this.recordDocumentElScrollTop()
    this.recordWindowWidth()
  },
  mounted(){
    /*this.recordDocumentElScrollTop()
    this.recordWindowWidth()*/
  },
  methods: {
    ...mapActions([
      'appointScrollTopOfDocumentEl',
      'appointWidthOfWindow'
    ]),
    recordDocumentElScrollTop() {
      window.addEventListener('scroll', () => {
        let bodyEl = document.documentElement || document.body
        this.appointScrollTopOfDocumentEl(bodyEl.scrollTop)
      })
    },
    recordWindowWidth() {
      var widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.appointWidthOfWindow(widthOfWindow)

      window.addEventListener('resize', this.recordWindowWidth)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
