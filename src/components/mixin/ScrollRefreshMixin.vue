<template>
</template>
<script>
export default {
  methods: {
    calculateDistanceToBottom() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      var distanceToBottom = scrollHeight - scrollTop - clientHeight
      return distanceToBottom
    },
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
