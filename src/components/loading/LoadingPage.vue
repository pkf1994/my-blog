<template>
    <div class="loading-cover flex-row-column-center" ref="cover">
      <i class="fa fa-spinner fa-pulse fa-2x"></i>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    mounted() {
      this.init()
    },
    computed: {
      ...mapState([
        'offsetHeightOfHeader',
        'offsetHeightOfNavbar'
      ]),
      bodyEl() {
        return document.documentElement || document.body
      }
    },
    methods: {
     init() {
       this.$nextTick(() => {
          this.$refs.cover.style.height = this.bodyEl.clientHeight - this.offsetHeightOfHeader - this.offsetHeightOfNavbar + 'px'
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.loading-cover
  width 100%
  height 100%

</style>
