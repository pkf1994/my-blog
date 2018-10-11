<template>
  <div class="header flex-row-center" ref="navbar">
    <div class="inner">
      <div class="logo font-llll flex-column-center common-padding" ref="logo">
        远方有鱼
        <div class="font-m font-normal"> It's a Wonderful Life ...</div>
      </div>
      <div class="navbar font-l">
        <span ></span>
        <span class="navbar-item cursorp flex-row-column-center" v-bind:class="{active: navbarItemActive==1, 'font-dark': navbarItemActive!=1}" @click="triggerNavbarItemActive(1)">杂谈</span>
        <span class="navbar-item cursorp flex-row-column-center" v-bind:class="{active: navbarItemActive==2, 'font-dark': navbarItemActive!=2}" @click="triggerNavbarItemActive(2)">关于</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      navbarItemActive: 1
    }
  },
  mounted() {
    this.uploadOffsetHeightOfNavbar()
   /* this.$nextTick(function () {
      this.initLogoDivWidth()
      window.addEventListener('resize', this.initLogoDivWidth)
    })*/
  },
  methods: {
    ...mapActions([
      'appointOffsetHeightOfNavbar'
    ]),
    /*initLogoDivWidth() {
      this.$refs.logo.style.width = 0.5 * (window.innerWidth - 750) + 'px'
    },*/
    uploadOffsetHeightOfNavbar() {
      setTimeout(() => {
        this.appointOffsetHeightOfNavbar(this.$refs.navbar.offsetHeight)
      }, 500)
    },
    triggerNavbarItemActive(itemCode) {
      this.navbarItemActive = itemCode
    }
  }
}
</script>

<style scoped lang="stylus">

.header{
  z-index 1
  position fixed
  top 0px
  background #F7F7F7
  height 150px
  width 100vw
  .inner{
    width 750px
    .logo{
      height 100px
    }
    .navbar{
      display flex
      align-items flex-end
      justify-content flex-end
      padding-bottom 0
    }
  }
}

.navbar-item
  padding 5px 15px
.active
  background white

@media (min-width: 750px){
  .navbar{
    height 50px
  }
}

@media (max-width: 750px){
  .header{
    height 65px
    .logo{
      display none
    }
    .navbar{
      height 65px
      span{
        height 100%
      }
    }
  }
}
</style>
