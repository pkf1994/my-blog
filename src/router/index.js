import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import ArticleEditor from '../components/articleEditor/ArticleEditor.vue'
import ArticlePage from '../components/article/ArticlePage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home.html',
      components: {
        Home: Home
      }
    },
    {
      path: '/article/:article_id',
      components: {
        ArticlePage
      }
    },
    {
      path: '/',
      redirect: '/home.html'
    },
    {
      path: '/article_edit.html',
      components: {
        ArticleEditor
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
