<template>
    <div class="backtoup">
      <div class="backtoup-inner" v-if="scropTopOfBody > 300">
        <i class="fa fa-arrow-up font-dark cursorp"  title="点击以返回顶部" @click="goToUp"></i>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return{
          scropTopOfBody: 0
        }
      },
      mounted() {
        this.init()
      },
      methods: {
       init() {
         let bodyEl = document.documentElement || document.body
         window.addEventListener('scroll', () => {
           this.scropTopOfBody = bodyEl.scrollTop
         })
       },
        goToUp(){
         window.scrollTo(0,0)
        }
      }
    }
</script>

<style scoped lang="stylus">
  .fa-arrow-up:hover
    color black

  .backtoup-inner
    padding 10px
    background rgba(204, 204, 204, 0.25)
    border-radius 5px
</style>
