<template>

</template>

<script>
export default {
  methods: {
    throttle(method, gap, delay) {
      clearTimeout(window.throttleTimer)
      window.throttleTimer = setTimeout(() => {
        var now = Date.now()
        if (!window.last) {
          method.call()
          window.last = now
          return
        }
        if (now - window.last > gap) {
          method.call()
          window.last = now
        }
      }, delay)
    }
  }
}
</script>

<style scoped>

</style>
