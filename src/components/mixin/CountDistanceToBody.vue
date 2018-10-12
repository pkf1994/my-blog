<template>
    
</template>

<script>
    export default {
        methods: {
          countDistanceToBody(el) {

            let distanceToBody = 0

            while(el != document.body) {
              distanceToBody = distanceToBody + el.offsetTop
              el = el.offsetParent
            }

            return distanceToBody
          }
        }
    }
</script>

<style scoped>

</style>
