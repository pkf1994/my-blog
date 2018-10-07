<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    scrollOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, this.scrollOptions)
      this.scroll.on('pullingUp', () => {
        setTimeout(() => {
          this.$emit('pullingUp')
          console.log('pullingUp!!!!!')
        }, 3000)
      })
      this.scroll.on('pullingDown', () => {
        this.$emit('pullingDown')
      })
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScroll')
      })
      this.scroll.on('scroll', () => {
        window.dispatchEvent(new Event('scroll'))
        window.onscroll = () => {
          console.log('scrolling')
        }
      })
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.finishPullUp()
        this.scroll.refresh()
      }, 20)
    }
  }
}
</script>

<style scoped>

</style>
