<template>
  <div id="app">
    <router-view name="RoutinePage"/>
    <router-view name="LoginPage"/>
  </div>
</template>

<script>
import RoutinePage from './components/wholePage/RoutinePage'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    RoutinePage
  },
  provide:{
    isMobile: window.innerWidth > 750 ? false : true
  },
  computed: {
    ...mapState(['scrollTopOfDocumentEl'])
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
        console.log('scroll')
        let bodyEl = document.documentElement || document.body
        this.appointScrollTopOfDocumentEl(bodyEl.scrollTop)
        console.log(this.scrollTopOfDocumentEl)
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
