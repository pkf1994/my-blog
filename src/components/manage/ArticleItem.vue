<template>
    <div class="article-item">
      <span class="article-title">{{article.article_title}}</span>
      <span class="article-author">{{article.article_author}}</span>
      <span class="article-label">{{article.article_label}}</span>
      <span class="article-releasetime">{{article.article_releaseTime}}</span>
    </div>
</template>

<script>
    export default {
        props: {
          article: {
            type: Object
          }
        }
    }
</script>

<style scoped>

</style>
