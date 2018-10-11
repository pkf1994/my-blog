<template>
    <div class="navbar">
      <span class="navbar-item cursorp flex-row-column-center font-l" v-bind:class="{active: navbarItemActive==1, 'font-dark': navbarItemActive!=1}" @click="triggerNavbarItemActive(1)">杂谈</span>
      <span class="navbar-item cursorp flex-row-column-center font-l" v-bind:class="{active: navbarItemActive==2, 'font-dark': navbarItemActive!=2}" @click="triggerNavbarItemActive(2)">关于</span>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        navbarItemActive: 1
      }
    },
    methods: {
      triggerNavbarItemActive(itemCode) {
        this.navbarItemActive = itemCode
      }
    }
  }
</script>

<style scoped lang="stylus">
.navbar
  background #F7F7F7
  width 750px
  height 50px
  display flex
  align-items flex-end
  justify-content flex-end
  padding-bottom 0
  .navbar-item
    padding 5px 25px
    height 100%

.active
  background white

</style>
