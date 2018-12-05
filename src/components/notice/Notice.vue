<template>
    <transition name="notice">
      <div class="notice common-border common-box-shadow flex-row-column-center" v-if="showNotice" :style="{left: leftOfNotice + 'px'}" ref="notice">
        <span>{{noticeMsg}}</span>
      </div>
    </transition>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        showNotice: false,
        leftOfNotice: 0
      }
    },
    computed: {
      ...mapState([
        'noticeMsg',
        'widthOfWindow',
        'noticeFlag'
      ])
    },
    mounted() {
      this.initLeftOfNotice()
    },
    watch: {
      noticeFlag() {
        this.showNotice = true

        setTimeout(() => {
          this.showNotice = false
        }, 2000)
      }
    },
    methods: {
      initLeftOfNotice() {
          //this.$refs.notice.style.left = (this.widthOfWindow - 200) * 0.5 + 'px'
        this.leftOfNotice = (this.widthOfWindow - 200) * 0.5
      }
    }
  }
</script>

<style scoped lang="stylus">
  .notice
    position fixed
    height 50px
    width 200px
    top 100px
    background white

  .notice-enter-active
  .notice-leave-active
    transition all .2s ease

  .notice-enter
  .notice-leave-to
    transform translateY(-100px)
    opacity 0


</style>
