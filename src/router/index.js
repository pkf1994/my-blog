import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import ArticlePage from '../components/article/ArticlePage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
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
      redirect: '/home'
    }
  ]
})
