import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import ArticleEditorPage from '../components/articleEditor/ArticleEditorPage.vue'
import ArticlePage from '../components/article/ArticlePage.vue'
import ArticleManage from '../components/manage/ArticleManage.vue'
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
      path: '/article_edit/:idOfEditingArticle',
      components: {
        ArticleEditorPage: ArticleEditorPage
      },
      props: {
        ArticleEditorPage: true
      }
    },
    {
      path: '/article_manage',
      components: {
        ArticleManage: ArticleManage
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
