import axios from 'axios'
import apiInfo from './apiInfo.js'

export default {
  getArticleSummaryListByCurrentPageAndPageScale: function (currentPage, pageScale) {
    var config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article_summary.do', config).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getArticleById: function (article_id) {
    var config = {
      params: {
        article_id: article_id
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article.do', config).then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
