import Vue from 'vue'
import Router from 'vue-router'
import State from '../store/state.js'
const Home = () => import('../components/home/Home.vue')
const ArticleEditorPage = () => import('../components/articleEditor/ArticleEditorPage.vue')
const ArticlePage = () => import('../components/article/ArticlePage.vue')
const ArticleManage = () => import('../components/manage/ArticleManage.vue')
const RoutinePage = () => import('../components/wholePage/RoutinePage.vue')
const LoginPage = () => import('../components/wholePage/LoginPage.vue')
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
          },
          props: { ArticlePage: true }
        },
        {
          path: 'article_manage',
          components: {
            ArticleManage: ArticleManage
          }
        },
        {
          path:'article_edit/:idOfEditingArticle',
          components: {
            ArticleEditorPage
          },
          props:{
            ArticleEditorPage: true
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
    },
    {
      path: '/login',
      components: {
        LoginPage
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {

    if(to.path.match(/^\/routine\/article\//) != null) {
      if(State.scrollTopOfDocumentEl > 150){
        return { x: 0, y: 150 }
      }
    }

    if(State.scrollTopOfDocumentEl < 150){
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
