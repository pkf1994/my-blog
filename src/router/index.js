import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import ArticleEditorPage from '../components/articleEditor/ArticleEditorPage.vue'
import ArticlePage from '../components/article/ArticlePage.vue'
import ArticleManage from '../components/manage/ArticleManage.vue'
import RoutinePage from '../components/wholePage/RoutinePage.vue'
Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/routine',
      components: {
        RoutinePage
      },
      children: [
        {
          path:'home',
          components: {
            Home
          }
        },
        {
          path: 'article/:article_id',
          components: {
            ArticlePage
          }
        },
        {
          path: 'article_manage',
          components: {
            ArticleManage: ArticleManage
          }
        },
        {
          path:'article_edit/:article_id',
          components: {
            ArticleEditorPage
          }
        }
      ]
    },
    {
      path: '/',
      redirect: '/routine/home'
    },
    {
      path: '/article_edit',
      redirect: '/article_edit/0'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if(to.query.body_scroll_top < 150){
      return savedPosition
    }
    if (savedPosition) {
      return savedPosition
    } else {
      if(to.query.id_of_comment_scroll_to != undefined || to.query.gotocl != undefined || to.query.gotoce != undefined){
        return { x: 0, y: 0 }
      }
      return { x: 0, y: 150 }
    }
  }
})



export default router
