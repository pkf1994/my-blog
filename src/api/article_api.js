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
  getDraftListByCurrentPageAndPageScale: function (currentPage, pageScale) {
    var config = {
      params: {
        currentPage: currentPage,
        pageScale: pageScale
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/draft_list.do', config).then(function (res) {
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
  },
  uploadArticle: function (article_id, article_title, article_author, article_label, article_content, article_type) {
    let articleData = {
      article_id: article_id,
      article_title: article_title,
      article_author: article_author,
      article_label: article_label,
      article_content: article_content,
      article_type: article_type
    }
    return new Promise((resolve, reject) => {
      axios.post(apiInfo.server + 'article/upload_article.do', articleData).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteArticle: function(article_id) {
    let config = {
      params: {
        article_id: article_id
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiInfo.server + 'article/delete_article.do', config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
