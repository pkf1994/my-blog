<template>
    
</template>

<script>
    export default {
      methods: {
        setCookie(name, value, keepDay) {
          let date = new Date();
          let keepTime = keepDay*3600*24*1000
          date.setTime(date.getTime() + keepTime)
          document.cookie = name + '=' + value +'; ' + 'expires=' + date.toGMTString() + '; ' + 'path=/;'
        },
        deleteCookie(name) {
          this.setCookie(name,'',-1)
        }
      }
    }
</script>

<style scoped>

</style>
