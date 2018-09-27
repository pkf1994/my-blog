<template>
  <div id="app">
    <navbar ref="navbar"></navbar>
    <div class="main-area" ref="mainArea">
      <router-view name="Home"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue'
export default {
  components: {
    Navbar
  },
  mounted() {
  }
}
</script>

<style type="stylus">
.main-area{
width: 100vw;
}
</style>
