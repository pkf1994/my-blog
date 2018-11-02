<template>
  <div id="app">
    <router-view name="RoutinePage"/>
  </div>
</template>

<script>
import RoutinePage from './components/wholePage/RoutinePage'
import { mapActions } from 'vuex'
export default {
  components: {
    RoutinePage
  },
  provide:{
    isMobile: window.innerWidth > 750 ? false : true
  },
  mounted(){
    this.recordDocumentElScrollTop()
  },
  methods: {
    ...mapActions([
      'appointScrollTopOfDocumentEl'
    ]),
    recordDocumentElScrollTop() {
      window.addEventListener('scroll', () => {
        let bodyEl = document.documentElement || document.body
        this.appointScrollTopOfDocumentEl(bodyEl.scrollTop)
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
