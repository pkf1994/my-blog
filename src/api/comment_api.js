import apiInfo from './apiInfo.js'
import axios from 'axios'

export default {
  getCommentListByArticleId(article_id, currentPage, pageScale) {
    var config = {
      params: {
        article_id: article_id,
        currentPage: currentPage,
        pageScale: pageScale
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/article.do', config).then(function (res) {
        resolve(res)
      }).catch(function (err) {
        reject(err)
      })
    })
  }
}
