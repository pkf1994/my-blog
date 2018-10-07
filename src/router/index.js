import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import Article from '../components/article/Article'
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
        Home: Article
      },
      props: true
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
