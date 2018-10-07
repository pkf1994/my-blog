<template>
  <div class="navbar">
    <div class="logo font-llll flex-column-center" ref="logo">
      Supercell
    </div>
    <div class="navbar-center-area font-lll flex-column-center">杂谈</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function () {
      this.initLogoDivWidth()
      window.addEventListener('resize', this.initLogoDivWidth)
    })
  },
  methods: {
    initLogoDivWidth() {
      this.$refs.logo.style.width = 0.5 * (window.innerWidth - 900) + 'px'
    }
  }
}
</script>

<style scoped lang="stylus">

.navbar{
  z-index 1
  position fixed
  top 0px
  background-image url('../../assets/imaga/texture/asfalt-light.png')
  background-color rgb(0, 79, 140)
  height 65px
  width 100vw
  display flex
  .logo{
    height 100%
    width auto
    min-width 180px
    padding 0 25px
    color white
    position relative
  }
  .navbar-center-area{
    width 900px
    justify-self center
    color white
    padding 0 25px
    font-family SimSun, Arial
  }
}
</style>
