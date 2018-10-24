<template>
    <div class="navbar" ref="navbar">
      <router-link to="/home.html" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark"  >杂谈</router-link>
      <span class="navbar-item cursorp flex-row-column-center font-l font-dark" >关于</span>
      <router-link to="/article_edit/0" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark" >创造</router-link>
      <router-link to="/article_manage" tag="span" class="navbar-item cursorp flex-row-column-center font-l font-dark" >管理</router-link>
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
  /*background #F7F7F7*/
  width 750px
  height 50px
  display flex
  align-items flex-end
  justify-content flex-end
  padding-bottom 0
  .navbar-logo
    padding 5px 25px
    height 100%
  .navbar-item
    padding 5px 25px
    height 100%

.router-link-active
  background white
  color black

</style>
